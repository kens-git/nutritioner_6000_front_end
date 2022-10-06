import React from 'react';
import Name from '../types/Name';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

const default_data = getDefaultContextData<Name>();
const NameDataContext =
  React.createContext<DataContextData<Name>>(default_data);
export const NameDataProvider =
  CreateDataProvider<Name>(NameDataContext, default_data, 'name');

export default NameDataContext;
