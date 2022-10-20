import Id from '../Id';

/** Defines a type that can be submitted as a new ConsumableCategory.  */
interface NewConsumableCategory {

  /** The id of the name. */
  name: Id;

  /** The description. */
  description: string;
}

export default NewConsumableCategory;
