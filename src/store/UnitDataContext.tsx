import React from 'react';
import Unit from '../types/Unit';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

export interface NewUnit {
  name: number,
  description: string
}

const extractNewUnit = (unit: Unit): NewUnit => {
  console.log(unit);
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
