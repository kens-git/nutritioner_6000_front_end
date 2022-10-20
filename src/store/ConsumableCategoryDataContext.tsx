import React from 'react';
import ConsumableCategory from '../types/ConsumableCategory';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";
import NewConsumableCategory from '../types/new/NewConsumableCategory';

const default_data =
  getDefaultContextData<ConsumableCategory, NewConsumableCategory>(
    'consumable-category', true);
const ConsumableCategoryDataContext =
  React.createContext<DataContextData<
    ConsumableCategory, NewConsumableCategory>>(default_data);
export const ConsumableCategoryDataProvider =
  CreateDataProvider<ConsumableCategory, NewConsumableCategory>(
    ConsumableCategoryDataContext, default_data);

export default ConsumableCategoryDataContext;
