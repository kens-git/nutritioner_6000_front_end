import Id from './Id';
import Name from './Name';

/** Defines a consumable's category as stored in the back end. */
interface ConsumableCategory {

  /** The id assigned by the back end. */
  id: Id;

  /** The name. */
  name: Name;

  /** The description. */
  description: string;
}

export default ConsumableCategory;
