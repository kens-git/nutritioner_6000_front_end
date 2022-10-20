import React from 'react';
import NewNutrient from '../types/new/NewNutrient';
import Nutrient from '../types/Nutrient';
import { CreateDataProvider, DataContextData,
  getDefaultContextData } from "./DataContext";

const default_data =
  getDefaultContextData<Nutrient, NewNutrient>('nutrient', true);
const NutrientDataContext =
  React.createContext<DataContextData<Nutrient, NewNutrient>>(default_data);
export const NutrientDataProvider =
  CreateDataProvider<Nutrient, NewNutrient>(NutrientDataContext, default_data);

export default NutrientDataContext;
