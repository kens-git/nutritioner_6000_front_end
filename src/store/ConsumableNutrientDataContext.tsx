import React, { useContext, useEffect, useRef, useState } from "react";
import ConsumableNutrient from "../types/ConsumableNutrient";
import AuthContext from "./AuthContext";
import { GET, POST } from "../utility/Requests";

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

// TODO: move
interface ConsumableNutrientResponse {
  id: number,
  nutrient: number,
  user: number,
  value: number
}

export const CreateConsumableNutrientDataProvider =
    <T extends Nutrients>(context: React.Context<ConsumableNutrientContextData>,
      defaultValue: ConsumableNutrientContextData)
    : React.FC<{children: React.ReactNode}> => {
  return (props) => {
    const authCtx = useContext(AuthContext);
    const callbackList =
      useRef<Array<(data: ConsumableNutrient[]) => void>>([]);
    const set = async (submitted_data: ConsumableNutrient[]) => {
      const r = await POST<any, any>(data.path, {
        timestamp: new Date().toISOString(), // TODO: set timestamp on server
        name: 'lmao6969lmao6969kekdefdef2plzplzplzhomey',
        description: 'desc',
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
        console.log(response!.data);
        setData({
          ...data,
          data: response!.data.at(-1)!.nutrients
        });
        callbackList.current!.forEach(item => {
          item(response!.data.at(-1)!.nutrients);
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
