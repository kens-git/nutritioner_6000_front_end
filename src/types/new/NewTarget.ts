import NewConsumableNutrient from './NewConsumableNutrient';

/** Defines a type that can be submitted as a new Target.  */
interface NewTarget {

  /** The timestamp as an ISO string. */
  timestamp: string;

  /** The name. */
  name: string;

  /** The description. */
  description: string;

  /** The nutrients. */
  nutrients: NewConsumableNutrient[];
}

export default NewTarget;
