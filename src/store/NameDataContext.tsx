import React from 'react';
import Name from '../types/Name';
import NewName from '../types/new/NewName';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

const default_data = getDefaultContextData<Name, NewName>('name', true);
const NameDataContext =
  React.createContext<DataContextData<Name, NewName>>(default_data);
export const NameDataProvider =
  CreateDataProvider<Name, NewName>(NameDataContext, default_data);

export default NameDataContext;
