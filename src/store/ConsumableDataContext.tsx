import React from 'react';
import Consumable from '../types/Consumable';
import { CreateDataProvider, DataContextData,
  getDefaultContextData } from "./DataContext";
import NewConsumable from '../types/new/NewConsumable';

const default_data =
  getDefaultContextData<Consumable, NewConsumable>('consumable', true);
const ConsumableDataContext =
  React.createContext<DataContextData<Consumable, NewConsumable>>(
    default_data);
export const ConsumableDataProvider =
  CreateDataProvider<Consumable, NewConsumable>(
    ConsumableDataContext, default_data);

export default ConsumableDataContext;
