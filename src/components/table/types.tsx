export type NutrientId = number;
export type ColumnIndex = number;
export type ColumnMap = Map<NutrientId, ColumnIndex>;
import Id from "../../types/Id";

export interface ColumnDetails {
  nutrient: Id;
  name: string;
  target: number;
  total: number;
  is_used: boolean;
}

export interface Columns {
  // maps a nutrient id to the column that contains its data
  nutrient_map: ColumnMap;
  // columns in order of index
  details: ColumnDetails[];
}

export interface Row {
  name: string,
  category?: string,
  timestamp?: Date,
  intake_size?: number,
  unit?: string,
  nutrient_values: (string | number | null)[];
}
