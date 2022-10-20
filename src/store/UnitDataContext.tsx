import React from 'react';
import Id from '../types/Id';
import Unit from '../types/Unit';
import { CreateDataProvider, DataContextData, getDefaultContextData }
  from "./DataContext";

// TODO: move
export interface NewUnit {
  name: Id,
  description: string
}

const defaultData = getDefaultContextData<Unit, NewUnit>('unit', true);
const UnitDataContext =
  React.createContext<DataContextData<Unit, NewUnit>>(defaultData);
export const UnitDataProvider =
  CreateDataProvider<Unit, NewUnit>(UnitDataContext, defaultData);

export default UnitDataContext;
