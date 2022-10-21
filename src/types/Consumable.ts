import ConsumableCategory from "./ConsumableCategory";
import ConsumableNutrient from './ConsumableNutrient'
import Id from "./Id";
import Unit from './Unit'

/** Defines a consumable as stored in the back end. */
interface Consumable {

  /** The id assigned by the back end. */
  id: Id;

  /** The name of the consumable. */
  name: string;

  /** The category. */
  category: ConsumableCategory;
  
  /** The unit. */
  unit: Unit;

  /**
   * The reference size, used to calculate nutrient values
   * proportional to intake size.
   */
  reference_size: number;

  /** The nutrients contained in the consumable. */
  nutrients: ConsumableNutrient[];
}

export default Consumable;
