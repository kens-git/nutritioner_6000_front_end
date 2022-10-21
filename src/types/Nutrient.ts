import Id from "./Id";
import Name from "./Name";
import Unit from "./Unit";

/** Defines a nutrient as stored in the back end. */
interface Nutrient {

  /** The id assigned by the back end. */
  id: Id;

  /** The name. */
  name: Name;

  /** The description. */
  description: string;
  
  /** The unit. */
  unit: Unit;

  /** Determines if the nutrient is considered a macronutrient. */
  is_macronutrient: boolean;
}

export default Nutrient;
