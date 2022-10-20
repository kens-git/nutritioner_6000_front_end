import React from 'react';
import Name from '../types/Name';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

const default_data = getDefaultContextData<Name, Name>('name', true);
const NameDataContext =
  React.createContext<DataContextData<Name, Name>>(default_data);
export const NameDataProvider =
  CreateDataProvider<Name, Name>(NameDataContext, default_data);

export default NameDataContext;
