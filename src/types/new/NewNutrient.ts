import Id from '../Id';

/** Defines a type that can be submitted as a new Nutrient.  */
interface NewNutrient {

  /** The id of the Name. */
  name: Id;

  /** The description. */
  description: string;

  /** The id of the Unit. */
  unit: Id;

  /** Determines if the nutrient is considered a macronutrient. */
  is_macronutrient: boolean;
}

export default NewNutrient;
