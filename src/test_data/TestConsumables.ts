import Consumable from "../types/Consumable";
import { CATEGORY_DAIRY, CATEGORY_FRUIT, CATEGORY_MEAT } from "./TestConsumableCategories";
import { NAME_APPLE, NAME_BACON, NAME_BANANA, NAME_MILK,
  NAME_STEAK } from "./TestNames";
import { NUTRIENT_BIOTIN, NUTRIENT_CARBOHYDRATES, NUTRIENT_COPPER, NUTRIENT_FAT, NUTRIENT_IODIDE,
  NUTRIENT_IRON, NUTRIENT_ZINC } from "./TestNutrients";
import { UNIT_GRAM } from "./TestUnits";

export const CONSUMABLE_APPLE: Consumable = {
  id: 1,
  name: 'Apple',
  category: CATEGORY_FRUIT,
  unit: UNIT_GRAM,
  reference_size: 100,
  nutrients: [
    {
      id: 1,
      nutrient: NUTRIENT_CARBOHYDRATES,
      value: 100
    },
    {
      id: 2,
      nutrient: NUTRIENT_COPPER,
      value: 100
    },
    {
      id: 3,
      nutrient: NUTRIENT_IODIDE,
      value: 100
    },
    {
      id: 4,
      nutrient: NUTRIENT_IRON,
      value: 100
    },
    {
      id: 5,
      nutrient: NUTRIENT_ZINC,
      value: 100
    }
  ]
}

export const CONSUMABLE_BACON: Consumable = {
  id: 2,
  name: 'Bacon',
  category: CATEGORY_MEAT,
  unit: UNIT_GRAM,
  reference_size: 100,
  nutrients: [
    {
      id: 6,
      nutrient: NUTRIENT_FAT,
      value: 100
    },
    {
      id: 7,
      nutrient: NUTRIENT_COPPER,
      value: 100
    },
    {
      id: 8,
      nutrient: NUTRIENT_IRON,
      value: 100
    },
    {
      id: 9,
      nutrient: NUTRIENT_ZINC,
      value: 100
    }
  ]
}

export const CONSUMABLE_BANANA: Consumable = {
  id: 3,
  name: 'Banana',
  category: CATEGORY_FRUIT,
  unit: UNIT_GRAM,
  reference_size: 100,
  nutrients: [
    {
      id: 10,
      nutrient: NUTRIENT_BIOTIN,
      value: 100
    },
    {
      id: 11,
      nutrient: NUTRIENT_IODIDE,
      value: 100
    }
  ]
}

export const CONSUMABLE_MILK: Consumable = {
  id: 4,
  name: 'Milk',
  category: CATEGORY_DAIRY,
  unit: UNIT_GRAM,
  reference_size: 100,
  nutrients: [
    {
      id: 12,
      nutrient: NUTRIENT_IRON,
      value: 100
    }
  ]
}

export const CONSUMABLE_STEAK: Consumable = {
  id: 5,
  name: 'Steak',
  category: CATEGORY_MEAT,
  unit: UNIT_GRAM,
  reference_size: 100,
  nutrients: [
    {
      id: 13,
      nutrient: NUTRIENT_COPPER,
      value: 100
    },
    {
      id: 14,
      nutrient: NUTRIENT_IRON,
      value: 100
    }
  ]
}
