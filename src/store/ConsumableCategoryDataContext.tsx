import React from 'react';
import Consumable from '../types/Consumable';
import ConsumableCategory from '../types/ConsumableCategory';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

// id: number;
// name: Name;
// description: string;

export interface NewConsumableCategory {
  // TODO: 
}

const extractNewConsumableCategory =
    (category: ConsumableCategory): NewConsumableCategory => {
  return {}
}

const default_data =
  getDefaultContextData<ConsumableCategory, NewConsumableCategory>(
    'consumable-category', extractNewConsumableCategory);
const ConsumableCategoryDataContext =
  React.createContext<DataContextData<
    ConsumableCategory, NewConsumableCategory>>(default_data);
export const ConsumableCategoryDataProvider =
  CreateDataProvider<ConsumableCategory, NewConsumableCategory>(
    ConsumableCategoryDataContext, default_data);

export default ConsumableCategoryDataContext;
