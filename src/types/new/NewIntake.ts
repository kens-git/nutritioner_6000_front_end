import Id from "../Id";

/** Defines a type that can be submitted as a new Intake.  */
interface NewIntake {

  /** The timestamp as an ISO string. */
  timestamp: string;

  /** The id of the Consumable. */
  consumable: Id;

  /** The serving size. */
  serving_size: number;
}

export default NewIntake;
