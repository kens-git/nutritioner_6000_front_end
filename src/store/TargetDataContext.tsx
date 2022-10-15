import React, { useContext, useEffect, useRef, useState } from 'react';
import ConsumableNutrient from '../types/ConsumableNutrient';
import { GET, POST } from '../utility/Requests';
import AuthContext from './AuthContext';
import Target from '../types/Target';

type TargetCallback = (data: ConsumableNutrient[]) => void;

type RegisterCallback = (callback: TargetCallback) => void;

type Setter = (submitted_data: ConsumableNutrient[], name: string,
  description: string) => void; // TODO: return type

interface TargetContextData {
  isLoaded: boolean;
  data: Map<number, ConsumableNutrient>;
  registerLoadCallback: RegisterCallback;
  set: Setter; // TODO: return type
}

const TargetDataContext = React.createContext<TargetContextData>({} as TargetContextData);

export const TargetDataProvider:
    React.FC<{children: React.ReactNode}> = (props) => {
  const authCtx = useContext(AuthContext);
  const callbackList =
    useRef<Array<(data: ConsumableNutrient[]) => void>>([]);
  const registerLoadCallback = (callback: (data: ConsumableNutrient[]) => void) => {
    callbackList.current!.push(callback);
  }
  const set = (submitted_data: ConsumableNutrient[], name: string,
      description: string) => {
    POST<any, any>('target', {
      timestamp: new Date().toISOString(), // TODO: set timestamp on server
      name: name,
      description: description,
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
      // success
    });
  }
  const [contextData, setContextData] = useState<TargetContextData>({
    isLoaded: false,
    data: new Map<number, ConsumableNutrient>(),
    registerLoadCallback: registerLoadCallback,
    set: set
  });
  
  useEffect(() => {
    GET<Target[]>('target', authCtx.token!, {getLatest: true})
    .then((response) => {
      setContextData({
        ...contextData,
        isLoaded: true,
        //data: response!.data.at(-1)!.nutrients
        data: new Map(response!.data.at(-1)!.nutrients.map(
          item => [item.nutrient.id, item]))
      });
      callbackList.current!.forEach(item => {
        item(response!.data.at(-1)!.nutrients);
      });
    });
  }, []);

  return (
    <TargetDataContext.Provider value={contextData}>
      {props.children}
    </TargetDataContext.Provider>
  );
}

export default TargetDataContext;
