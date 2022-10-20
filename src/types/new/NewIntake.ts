import Id from "../Id";

interface NewIntake {
  // ISO string
  timestamp: string,
  consumable: Id,
  serving_size: number;
}

export default NewIntake;
