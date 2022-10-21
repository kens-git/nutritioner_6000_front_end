import ConsumableNutrient from "./ConsumableNutrient";
import Id from "./Id";

/**
 * Defines a collection of reference daily values as stored
 * in the back end.
 */
interface DailyValue {

  /** The id assigned by the back end. */
  id: Id;

  /** The nutrients with their corresponding daily values. */
  nutrients: ConsumableNutrient[];
}

export default DailyValue;
