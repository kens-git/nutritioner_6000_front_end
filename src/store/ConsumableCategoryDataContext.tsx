import React from 'react';
import ConsumableCategory from '../types/ConsumableCategory';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

const default_data = getDefaultContextData<ConsumableCategory>();
const ConsumableCategoryDataContext =
  React.createContext<DataContextData<ConsumableCategory>>(default_data);
export const ConsumableCategoryDataProvider =
  CreateDataProvider<ConsumableCategory>(ConsumableCategoryDataContext, default_data,
    'consumable-category');

export default ConsumableCategoryDataContext;
