import React from 'react';
import Consumable from '../types/Consumable';
import { CreateDataProvider, DataContextData,
  getDefaultContextData } from "./DataContext";

const default_data = getDefaultContextData<Consumable>();
const ConsumableDataContext =
  React.createContext<DataContextData<Consumable>>(default_data);
export const ConsumableDataProvider =
  CreateDataProvider<Consumable>(ConsumableDataContext,
    default_data, 'consumable');

export default ConsumableDataContext;
