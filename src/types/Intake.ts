import Consumable from "./Consumable";
import Id from "./Id";

/** Defines a user's logged intake as stored in the back end. */
interface Intake {

  /** The id assigned by the back end. */
  id: Id;

  /** The timestamp of the intake as submitted by the user. */
  timestamp: Date;

  /** The consumable that was consumed. */
  consumable: Consumable;

  /** The serving size. */
  serving_size: number;
}

export default Intake;
