import Id from './Id';
import Nutrient from './Nutrient';

/**
 * Defines a nutrient with a corresponding amount, as stored
 * in the back end.
 */
interface ConsumableNutrient {

  /** The id assigned by the back end. */
  id: Id;

  /** The nutrient. */
  nutrient: Nutrient;

  /** The amount of the nutrient. */
  value: number
}

export default ConsumableNutrient;
