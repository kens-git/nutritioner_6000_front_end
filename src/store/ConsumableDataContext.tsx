import React from 'react';
import Consumable from '../types/Consumable';
import { CreateDataProvider, DataContextData,
  getDefaultContextData } from "./DataContext";

  // id: number;
  // name: Name;
  // category: ConsumableCategory;
  // unit: Unit;
  // reference_size: number;
  // nutrients: ConsumableNutrient[];

export interface NewConsumable {
  // TODO: 
}

const extractNewConsumable =
    (consumable: Consumable): NewConsumable => {
  return {}
}

const default_data =
  getDefaultContextData<Consumable, NewConsumable>(
    'consumable', extractNewConsumable);
const ConsumableDataContext =
  React.createContext<DataContextData<Consumable, NewConsumable>>(
    default_data);
export const ConsumableDataProvider =
  CreateDataProvider<Consumable, NewConsumable>(
    ConsumableDataContext, default_data);

export default ConsumableDataContext;
