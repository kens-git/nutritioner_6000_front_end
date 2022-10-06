import React, { useContext, useEffect, useState } from "react";
import ConsumableNutrient from "../types/ConsumableNutrient";
import AuthContext from "./AuthContext";
import { GET } from "../utility/Requests";

interface Nutrients {
  nutrients: ConsumableNutrient[];
}

export interface ConsumableNutrientContextData {
  path: string;
  isLoaded: boolean;
  data: ConsumableNutrient[];
  set: (data: ConsumableNutrient[]) => void; // TODO: return something useful
};

export const getDefaultNutrientContextData = (path: string): ConsumableNutrientContextData => {
  return {
    path: path,
    isLoaded: false,
    data: [],
    set: (data) => {}
  }
};

export const CreateConsumableNutrientDataProvider =
    <T extends Nutrients>(context: React.Context<ConsumableNutrientContextData>,
      defaultValue: ConsumableNutrientContextData)
    : React.FC<{children: React.ReactNode}> => {
  return (props) => {
    const authCtx = useContext(AuthContext);
    const set = (data: ConsumableNutrient[]) => {
      
    }
    const [data, setData] = useState<ConsumableNutrientContextData>({
      ...defaultValue,
      set: set
    });

    useEffect(() => {
      GET<T[]>(data.path, authCtx.token!)
      .then((response) => {
        setData({
          ...data,
          data: response!.data[0].nutrients
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
