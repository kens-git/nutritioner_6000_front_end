import React from 'react';
import NewDailyValue from '../types/new/NewDailyValue';
import DailyValue from "../types/DailyValue";
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

const defaultData =
  getDefaultContextData<DailyValue, NewDailyValue>('daily-value', true);
const DailyValueDataContext =
  React.createContext<DataContextData<DailyValue, NewDailyValue>>(defaultData);
export const DailyValueDataProvider =
  CreateDataProvider<DailyValue, NewDailyValue>(DailyValueDataContext, defaultData);

export default DailyValueDataContext;
