import ConsumableNutrient from "../ConsumableNutrient";
import Id from "../Id";

interface NewConsumable {
  name: string;
  category: Id;
  unit: Id;
  reference_size: number;
  nutrients: ConsumableNutrient[];
}

export default NewConsumable;
