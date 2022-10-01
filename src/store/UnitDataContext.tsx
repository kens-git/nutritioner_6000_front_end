import React from 'react';
import Unit from '../types/Unit';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

const default_data = getDefaultContextData<Unit>();
const UnitDataContext =
  React.createContext<DataContextData<Unit>>(default_data);
export const UnitDataProvider =
  CreateDataProvider<Unit>(UnitDataContext, default_data, 'unit');

export default UnitDataContext;
