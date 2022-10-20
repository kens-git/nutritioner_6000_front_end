import Id from "../Id";

/** Defines a type that can be submitted as a new Unit.  */
export interface NewUnit {
  
  /** The id of the Name. */
  name: Id;
  
  /** The description. */
  description: string;
}

export default NewUnit;
