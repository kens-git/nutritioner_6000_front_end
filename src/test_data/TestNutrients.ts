import Nutrient from '../models/types/Nutrient'
import { NAME_BIOTIN, NAME_CARBOHYDRATES, NAME_COPPER,
  NAME_FAT, NAME_IODIDE, NAME_IRON, NAME_PROTEIN,
  NAME_ZINC } from '../test_data/TestNames'
import { UNIT_GRAM, UNIT_MICROGRAM,
  UNIT_MILLIGRAM } from './TestUnits'

export const NUTRIENT_BIOTIN: Nutrient = {
  id: 1,
  name: NAME_BIOTIN,
  description: '',
  unit: UNIT_MICROGRAM,
  is_macronutrient: false
}

export const NUTRIENT_COPPER: Nutrient = {
  id: 2,
  name: NAME_COPPER,
  description: '',
  unit: UNIT_MILLIGRAM,
  is_macronutrient: false
}

export const NUTRIENT_IODIDE: Nutrient = {
  id: 3,
  name: NAME_IODIDE,
  description: '',
  unit: UNIT_MICROGRAM,
  is_macronutrient: false
}

export const NUTRIENT_IRON: Nutrient = {
  id: 4,
  name: NAME_IRON,
  description: '',
  unit: UNIT_MILLIGRAM,
  is_macronutrient: false
}

export const NUTRIENT_ZINC: Nutrient = {
  id: 5,
  name: NAME_ZINC,
  description: '',
  unit: UNIT_MILLIGRAM,
  is_macronutrient: false
}

export const NUTRIENT_FAT: Nutrient = {
  id: 6,
  name: NAME_FAT,
  description: '',
  unit: UNIT_GRAM,
  is_macronutrient: true
}

export const NUTRIENT_CARBOHYDRATES: Nutrient = {
  id: 7,
  name: NAME_CARBOHYDRATES,
  description: '',
  unit: UNIT_GRAM,
  is_macronutrient: true
}

export const NUTRIENT_PROTEIN: Nutrient = {
  id: 8,
  name: NAME_PROTEIN,
  description: '',
  unit: UNIT_GRAM,
  is_macronutrient: true
}

export const TEST_NUTRIENTS: Nutrient[] = [
  NUTRIENT_FAT, NUTRIENT_CARBOHYDRATES, NUTRIENT_PROTEIN,
  NUTRIENT_BIOTIN, NUTRIENT_COPPER, NUTRIENT_IODIDE,
  NUTRIENT_IRON, NUTRIENT_ZINC
]
