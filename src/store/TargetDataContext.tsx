import React from "react";
import { ConsumableNutrientContextData, CreateConsumableNutrientDataProvider,
  getDefaultNutrientContextData } from "./ConsumableNutrientDataContext";

const default_data = getDefaultNutrientContextData('target');
const TargetDataContext = React.createContext<ConsumableNutrientContextData>(default_data);
export const TargetDataProvider =
  CreateConsumableNutrientDataProvider(TargetDataContext, default_data);

export default TargetDataContext;
