import React from 'react';
import ConsumableNutrient from '../types/ConsumableNutrient';
import Target from "../types/Target";
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

// TODO: move
interface NewTarget {
  timestamp: string;
  name: string;
  description: string;
  nutrients: ConsumableNutrient[];
}

const defaultData = getDefaultContextData<Target, NewTarget>('target', true);
const TargetDataContext =
  React.createContext<DataContextData<Target, NewTarget>>(defaultData);
export const TargetDataProvider =
  CreateDataProvider<Target, NewTarget>(TargetDataContext, defaultData);

export default TargetDataContext;
