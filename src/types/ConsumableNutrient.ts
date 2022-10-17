import Id from './Id';
import Nutrient from './Nutrient';

interface ConsumableNutrient {
  id: Id;
  nutrient: Nutrient;
  value: number
}

export default ConsumableNutrient;
