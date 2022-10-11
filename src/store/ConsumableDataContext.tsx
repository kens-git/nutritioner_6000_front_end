import React from 'react';
import Consumable from '../types/Consumable';
import ConsumableNutrient from '../types/ConsumableNutrient';
import Nutrient from '../types/Nutrient';
import { CreateDataProvider, DataContextData,
  getDefaultContextData } from "./DataContext";

export interface NewConsumable {
  name: string;
  category: number;
  unit: number;
  reference_size: number;
  nutrients: ConsumableNutrient[];
}

const extractNewConsumable =
    (consumable: Consumable): NewConsumable => {
  return {
    name: consumable.name,
    category: consumable.category.id,
    unit: consumable.unit.id,
    reference_size: consumable.reference_size,
     // TODO: convenient, but broken return type
    nutrients: consumable.nutrients.map((item): any => {
      return {
        id: -1,
        nutrient: item.nutrient.id,
        value: item.value,
        user: 1
      }
    })
  }
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
