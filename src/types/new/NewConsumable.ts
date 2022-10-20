import Id from "../Id";
import NewConsumableNutrient from "./NewConsumableNutrient";

/** Defines a type that can be submitted as a new Consumable.  */
interface NewConsumable {

  /** The name. */
  name: string;

  /** The id of the Category. */
  category: Id;

  /** The id of the Unit. */
  unit: Id;

  /** The reference size. */
  reference_size: number;

  /** The nutrients. */
  nutrients: NewConsumableNutrient[];
}

export default NewConsumable;
