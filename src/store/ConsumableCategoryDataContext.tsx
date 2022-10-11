import React from 'react';
import ConsumableCategory from '../types/ConsumableCategory';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

export interface NewConsumableCategory {
  name: number;
  description: string;
}

const extractNewConsumableCategory =
    (category: ConsumableCategory): NewConsumableCategory => {
  return {
    name: category.name.id,
    description: category.description
  }
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
