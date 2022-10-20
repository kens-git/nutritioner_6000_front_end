import Consumable from '../../types/Consumable';
import ConsumableCategory from '../../types/ConsumableCategory';
import Name from '../../types/Name';
import Nutrient from '../../types/Nutrient';
import Unit from '../../types/Unit';

/** Defines an item displayed in the Select component. */
export default interface SelectItem {

  /** The id of the item. */
  id: string;

  /** The item's displayed text. */
  label: string;
}

/**
 * Function to create a SelectItem from a Consumable.
 * 
 * @param consumable The given Consumable.
 * @returns A SelectItem representation of the Consumable.
 */
export const extractConsumableItem =
    (consumable: Consumable): SelectItem => {
  return {
    id: consumable.id.toString(),
    label: consumable.name
  }
}

/**
 * Function to create a SelectItem from a ConsumableCategory.
 * 
 * @param category The given ConsumableCategory.
 * @returns A SelectItem representation of the ConsumableCategory.
 */
export const extractConsumableCategoryItem =
    (category: ConsumableCategory): SelectItem => {
  return {
    id: category.id.toString(),
    label: category.name.name
  }
}

/**
 * Function to create a SelectItem from a Name.
 * 
 * @param name The given Name.
 * @returns A SelectItem representation of the Name.
 */
export const extractNameItem = (name: Name): SelectItem => {
  return {
    id: name.id.toString(),
    label: name.name
  }
};

/**
 * Function to create a SelectItem from a Nutrient.
 * 
 * @param nutrient The given Nutrient.
 * @returns A SelectItem representation of the Nutrient.
 */
export const extractNutrientItem = (nutrient: Nutrient): SelectItem => {
  return {
    id: nutrient.id.toString(),
    label: nutrient.name.name
  }
}

/**
 * Function to create a SelectItem from a Unit.
 * 
 * @param unit The given Unit.
 * @returns A SelectItem representation of the Unit.
 */
export const extractUnitItem = (unit: Unit): SelectItem => {
  return {
    id: unit.id.toString(),
    label: unit.name.name
  }
};
