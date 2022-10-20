export type NutrientId = number;
export type ColumnIndex = number;
export type ColumnMap = Map<NutrientId, ColumnIndex>;
import Id from "../../types/Id";

/** Defines the column data for a nutrient. */
export interface ColumnDetails {

  /** The nutrient id. */
  nutrient: Id;

  /** The nutrient name. */
  name: string;

  /** The target for the nutrient. */
  target: number;

  /** The total intake of the nutrient. */
  total: number;

  /** Determines if the column should be displayed. */
  is_used: boolean;
}

/** Defines the nutrient columns in the Table. */
export interface Columns {

  /** Maps a nutrient id to the column that contains its data. */
  nutrient_map: ColumnMap;

  /** The details of the columns, in the order they're displayed. */
  details: ColumnDetails[];
}

/** Defines a row displayed in the Table. */
export interface Row {

  /** The row's name. */
  name: string,

  /** The row's category. */
  category?: string,

  /** The row's timestamp. */
  timestamp?: Date,

  /** The row's intake size. */
  intake_size?: number,

  /** The row's unit. */
  unit?: string,

  /** The row's values for each nutrient, in the order they're displayed. */
  nutrient_values: (string | number | null)[];
}
