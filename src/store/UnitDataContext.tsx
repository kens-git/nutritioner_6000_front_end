import React from 'react';
import Id from '../types/Id';
import Unit from '../types/Unit';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

export interface NewUnit {
  name: Id,
  description: string
}

const extractNewUnit = (unit: Unit): NewUnit => {
  return {
    name: unit.name.id,
    description: unit.description
  }
}

const default_data = getDefaultContextData<Unit, NewUnit>(
  'unit', extractNewUnit);
const UnitDataContext =
  React.createContext<DataContextData<Unit, NewUnit>>(default_data);
export const UnitDataProvider =
  CreateDataProvider<Unit, NewUnit>(UnitDataContext, default_data);

export default UnitDataContext;
