import Id from "../Id";

interface NewIntake {
  timestamp: Date,
  consumable: Id,
  serving_size: number;
}

export default NewIntake;
