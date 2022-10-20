import Id from '../Id';

/** Defines a type that can be submitted as a new ConsumableNutrient.  */
interface NewConsumableNutrient {
  
  /** The id of the Nutrient. */
  nutrient: Id;

  /** The nutrient's amount. */
  value: number;
}

export default NewConsumableNutrient;
