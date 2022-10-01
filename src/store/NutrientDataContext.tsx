import React from 'react';
import Nutrient from '../types/Nutrient';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

const default_data = getDefaultContextData<Nutrient>();
const NutrientDataContext =
  React.createContext<DataContextData<Nutrient>>(default_data);
export const NutrientDataProvider =
  CreateDataProvider<Nutrient>(NutrientDataContext, default_data, 'nutrient');

export default NutrientDataContext;
