import React from "react";
import { ConsumableNutrientContextData, CreateConsumableNutrientDataProvider,
  getDefaultNutrientContextData } from "./ConsumableNutrientDataContext";

const default_data = getDefaultNutrientContextData('daily-value');
const DailyValueDataContext =
  React.createContext<ConsumableNutrientContextData>(default_data);
export const DailyValueDataProvider =
  CreateConsumableNutrientDataProvider(DailyValueDataContext, default_data);

export default DailyValueDataContext;
