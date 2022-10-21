import ConsumableNutrient from "./ConsumableNutrient";
import Id from "./Id";
import Name from "./Name";

/** Defines a user's daily nutrient targets, as stored in the back end. */
interface Target {

  /** The id assigned by the back end. */
  id: Id;

  /** The timestamp when the user submitted the target values. */
  timestamp: Date;

  /** The name of the target. */
  name: Name;

  /** The description. */
  description: string;

  /** The nutrients with their corresponding target values. */
  nutrients: ConsumableNutrient[];
}

export default Target;
