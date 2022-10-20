import React from 'react';
import NewUnit from '../types/new/NewUnit';
import Unit from '../types/Unit';
import { CreateDataProvider, DataContextData, getDefaultContextData }
  from "./DataContext";

const defaultData = getDefaultContextData<Unit, NewUnit>('unit', true);
const UnitDataContext =
  React.createContext<DataContextData<Unit, NewUnit>>(defaultData);
export const UnitDataProvider =
  CreateDataProvider<Unit, NewUnit>(UnitDataContext, defaultData);

export default UnitDataContext;
