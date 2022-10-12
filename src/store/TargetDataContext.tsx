// import React from "react";
// import { ConsumableNutrientContextData, CreateConsumableNutrientDataProvider,
//   getDefaultNutrientContextData } from "./ConsumableNutrientDataContext";

// const default_data = getDefaultNutrientContextData('target');
// const TargetDataContext = React.createContext<ConsumableNutrientContextData>(default_data);
// export const TargetDataProvider =
//   CreateConsumableNutrientDataProvider(TargetDataContext, default_data);

// export default TargetDataContext;
import React, { useContext, useEffect, useRef, useState } from 'react';
import ConsumableNutrient from '../types/ConsumableNutrient';
import { GET, POST } from '../utility/Requests';
import AuthContext from './AuthContext';

type TargetCallback = (data: ConsumableNutrient[]) => void;

type RegisterCallback = (callback: TargetCallback) => void;

type Setter = (submitted_data: ConsumableNutrient[], name: string,
  description: string) => void; // TODO: return type

interface TargetContextData {
  isLoaded: boolean;
  data: ConsumableNutrient[];
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
  const set = async (submitted_data: ConsumableNutrient[], name: string,
      description: string) => {
    const r = await POST<any, any>('target', {
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
    }, authCtx.token!);
  }
  const [contextData, setContextData] = useState<TargetContextData>({
    isLoaded: false,
    data: [],
    registerLoadCallback: registerLoadCallback,
    set: set
  });
  
  useEffect(() => {
    // TODO: type
    GET<any[]>('target', authCtx.token!)
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
    <TargetDataContext.Provider value={contextData}>
      {props.children}
    </TargetDataContext.Provider>
  );
}

export default TargetDataContext;
