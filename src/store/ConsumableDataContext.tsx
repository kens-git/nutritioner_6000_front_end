import React from 'react';
import Consumable from '../types/Consumable';
import ConsumableNutrient from '../types/ConsumableNutrient';
import { CreateDataProvider, DataContextData,
  getDefaultContextData } from "./DataContext";

// TODO: Id, move
export interface NewConsumable {
  name: string;
  category: number;
  unit: number;
  reference_size: number;
  nutrients: ConsumableNutrient[];
}

const default_data =
  getDefaultContextData<Consumable, NewConsumable>('consumable', true);
const ConsumableDataContext =
  React.createContext<DataContextData<Consumable, NewConsumable>>(
    default_data);
export const ConsumableDataProvider =
  CreateDataProvider<Consumable, NewConsumable>(
    ConsumableDataContext, default_data);

export default ConsumableDataContext;
