import Id from "../Id";
import NewConsumableNutrient from "./NewConsumableNutrient";

interface NewConsumable {
  name: string;
  category: Id;
  unit: Id;
  reference_size: number;
  nutrients: NewConsumableNutrient[];
}

export default NewConsumable;
