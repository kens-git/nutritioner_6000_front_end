/** Defines a type that can be submitted as a new Name.  */
interface NewName {

  /** The name. */
  name: string;

  /** The abbreviation. */
  abbreviation: string;

  /** The plural form of the name. */
  plural: string;
}

export default NewName;
