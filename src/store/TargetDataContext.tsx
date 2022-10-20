import React from 'react';
import NewTarget from '../types/new/NewTarget';
import Target from "../types/Target";
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

const defaultData = getDefaultContextData<Target, NewTarget>('target', true);
const TargetDataContext =
  React.createContext<DataContextData<Target, NewTarget>>(defaultData);
export const TargetDataProvider =
  CreateDataProvider<Target, NewTarget>(TargetDataContext, defaultData);

export default TargetDataContext;
