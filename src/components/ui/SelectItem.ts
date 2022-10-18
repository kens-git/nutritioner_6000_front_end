import Consumable from '../../types/Consumable';
import ConsumableCategory from '../../types/ConsumableCategory';
import Name from '../../types/Name';
import Nutrient from '../../types/Nutrient';
import Unit from '../../types/Unit';

export default interface SelectItem {
  id: string;
  label: string;
}

export const extractConsumableItem =
    (consumable: Consumable): SelectItem => {
  return {
    id: consumable.id.toString(),
    label: consumable.name
  }
}

export const extractConsumableCategoryItem =
    (category: ConsumableCategory): SelectItem => {
  return {
    id: category.id.toString(),
    label: category.name.name
  }
}

export const extractNameItem = (name: Name): SelectItem => {
  return {
    id: name.id.toString(),
    label: name.name
  }
};

export const extractNutrientItem = (nutrient: Nutrient): SelectItem => {
  return {
    id: nutrient.id.toString(),
    label: nutrient.name.name
  }
}

export const extractUnitItem = (unit: Unit): SelectItem => {
  return {
    id: unit.id.toString(),
    label: unit.name.name
  }
};
