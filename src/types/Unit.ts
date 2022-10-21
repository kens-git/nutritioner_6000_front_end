import Id from './Id';
import Name from './Name'

/** Defines a unit as stored in the back end. */
interface Unit {

  /** The id assigned by the back end. */
  id: Id;

  /** The unit name. */
  name: Name;

  /** The description. */
  description: string;
}

export default Unit;
