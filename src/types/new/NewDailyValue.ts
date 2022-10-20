import NewConsumableNutrient from './NewConsumableNutrient';

/** Defines a type that can be submitted as a new DailyValue.  */
interface NewDailyValue {

  /** The nutrients. */
  nutrients: NewConsumableNutrient[];
}

export default NewDailyValue;
