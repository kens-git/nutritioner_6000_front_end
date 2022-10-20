import React from 'react';
import Nutrient from '../types/Nutrient';
import { CreateDataProvider, DataContextData,
  getDefaultContextData } from "./DataContext";

export interface NewNutrient {
  name: number;
  description: string;
  unit: number;
  is_macronutrient: boolean;
}

const default_data =
  getDefaultContextData<Nutrient, NewNutrient>('nutrient', true);
const NutrientDataContext =
  React.createContext<DataContextData<Nutrient, NewNutrient>>(default_data);
export const NutrientDataProvider =
  CreateDataProvider<Nutrient, NewNutrient>(NutrientDataContext, default_data);

export default NutrientDataContext;
