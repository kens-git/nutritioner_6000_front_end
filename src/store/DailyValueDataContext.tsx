import React, { useContext, useEffect, useRef, useState } from 'react';
import ConsumableNutrient from '../types/ConsumableNutrient';
import DailyValue from '../types/DailyValue';
import { GET, POST } from '../utility/Requests';
import AuthContext from './AuthContext';

type DailyValueCallback = (data: ConsumableNutrient[]) => void;

type RegisterCallback = (callback: DailyValueCallback) => void;

// !!! different
type Setter = (submitted_data: ConsumableNutrient[]) => void; // TODO: return type

interface DailyValueContextData {
  isLoaded: boolean;
  data: ConsumableNutrient[];
  registerLoadCallback: RegisterCallback;
  set: Setter; // TODO: return type
}

const DailyValueDataContext = React.createContext<DailyValueContextData>(
  {} as DailyValueContextData);

export const DailyValueDataProvider:
    React.FC<{children: React.ReactNode}> = (props) => {
  const authCtx = useContext(AuthContext);
  const callbackList =
    useRef<Array<(data: ConsumableNutrient[]) => void>>([]);
  const registerLoadCallback = (callback: (data: ConsumableNutrient[]) => void) => {
    callbackList.current!.push(callback);
  }
  const set = (submitted_data: ConsumableNutrient[]) => {
    // !!! path different
    // !!! POST type parameters different
    POST<any, any>('daily-value', {
      // !!! properties different, no name, desc., and timestamp
      nutrients: submitted_data.map(item => {
        return {
          nutrient: item.nutrient.id,
          value: item.value,
          user: +authCtx.user_id!
        }
      }),
      user: +authCtx.user_id!
    }, authCtx.token!)
    .then(response => {
      setContextData({
        ...contextData,
        data: submitted_data
      });
    });
  }
  const [contextData, setContextData] = useState<DailyValueContextData>({
    isLoaded: false,
    data: [],
    registerLoadCallback: registerLoadCallback,
    set: set
  });
  
  useEffect(() => {
    // !!! path different
    // !!! response return type different
    GET<DailyValue[]>('daily-value', authCtx.token!, {getLatest: true})
    .then((response) => {
      setContextData({
        ...contextData,
        isLoaded: true,
        data: response!.data.at(-1)!.nutrients
      });
      callbackList.current!.forEach(item => {
        item(response!.data.at(-1)!.nutrients);
      });
    });
  }, []);

  return (
    <DailyValueDataContext.Provider value={contextData}>
      {props.children}
    </DailyValueDataContext.Provider>
  );
}

export default DailyValueDataContext;
