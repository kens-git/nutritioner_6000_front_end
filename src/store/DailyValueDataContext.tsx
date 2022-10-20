import React from 'react';
import ConsumableNutrient from '../types/ConsumableNutrient';
import DailyValue from "../types/DailyValue";
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

interface NewDailyValue {
  nutrients: ConsumableNutrient[];
}

const defaultData =
  getDefaultContextData<DailyValue, NewDailyValue>('daily-value', true);
const DailyValueDataContext =
  React.createContext<DataContextData<DailyValue, NewDailyValue>>(defaultData);
export const DailyValueDataProvider =
  CreateDataProvider<DailyValue, NewDailyValue>(DailyValueDataContext, defaultData);

export default DailyValueDataContext;
