import React from 'react';
import Nutrient from '../types/Nutrient';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";


// id: number;
// name: Name;
// description: string;
// unit: Unit;
// is_macronutrient: boolean;

export interface NewNutrient {
  name: number;
  description: string;
  unit: number;
  is_macronutrient: boolean;
}

const extractNewNutrient = (nutrient: Nutrient): NewNutrient => {
  return {
    name: nutrient.name.id,
    description: nutrient.description,
    unit: nutrient.unit.id,
    is_macronutrient: nutrient.is_macronutrient
  }
}

const default_data =
  getDefaultContextData<Nutrient, NewNutrient>(
    'nutrient', extractNewNutrient);
const NutrientDataContext =
  React.createContext<DataContextData<Nutrient, NewNutrient>>(default_data);
export const NutrientDataProvider =
  CreateDataProvider<Nutrient, NewNutrient>(NutrientDataContext, default_data);

export default NutrientDataContext;
