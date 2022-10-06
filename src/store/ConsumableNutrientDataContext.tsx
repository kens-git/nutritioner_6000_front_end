import React, { useContext, useEffect, useRef, useState } from "react";
import ConsumableNutrient from "../types/ConsumableNutrient";
import AuthContext from "./AuthContext";
import { GET } from "../utility/Requests";

export type ConsumableNutrientCallback =
  (data: ConsumableNutrient[]) => void;

export type ConsumableNutrientRegisterFunction =
  (callback: ConsumableNutrientCallback) => void;

interface Nutrients {
  nutrients: ConsumableNutrient[];
}

export interface ConsumableNutrientContextData {
  path: string;
  isLoaded: boolean;
  data: ConsumableNutrient[];
  registerLoadCallback: ConsumableNutrientRegisterFunction,
  set: (data: ConsumableNutrient[]) => void; // TODO: return something useful
};

export const getDefaultNutrientContextData = (path: string): ConsumableNutrientContextData => {
  return {
    path: path,
    isLoaded: false,
    data: [],
    registerLoadCallback: (callback: ConsumableNutrientCallback) => {},
    set: (data) => {}
  }
};

export const CreateConsumableNutrientDataProvider =
    <T extends Nutrients>(context: React.Context<ConsumableNutrientContextData>,
      defaultValue: ConsumableNutrientContextData)
    : React.FC<{children: React.ReactNode}> => {
  return (props) => {
    const authCtx = useContext(AuthContext);
    const callbackList =
      useRef<Array<(data: ConsumableNutrient[]) => void>>([]);
    const set = (data: ConsumableNutrient[]) => {
      
    }
    const registerLoadCallback = (callback: (data: ConsumableNutrient[]) => void) => {
      callbackList.current!.push(callback);
    }
    const [data, setData] = useState<ConsumableNutrientContextData>({
      ...defaultValue,
      registerLoadCallback: registerLoadCallback,
      set: set
    });

    useEffect(() => {
      GET<T[]>(data.path, authCtx.token!)
      .then((response) => {
        setData({
          ...data,
          data: response!.data[0].nutrients
        });
        callbackList.current!.forEach(item => {
          item(response!.data[0].nutrients);
        });
      });
    }, []);

    return (
      <context.Provider value={data}>
        {props.children}
      </context.Provider>
    );
  }
}
