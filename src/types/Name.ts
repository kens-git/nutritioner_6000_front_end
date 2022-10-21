import Id from "./Id";

/** Defines a name, as stored in the back end. */
export interface Name {

  /** The id assigned by the back end. */
  id: Id;

  /** The name. */
  name: string;

  /** The abbreviation of the name. */
  abbreviation: string;

  /** The plural form of the name. */
  plural: string;
}

export default Name;
