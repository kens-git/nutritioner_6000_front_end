import ConsumableNutrient from "./ConsumableNutrient";
import Id from "./Id";
import Name from "./Name";

interface Target {
  id: Id;
  timestamp: Date;
  name: Name;
  description: string;
  nutrients: ConsumableNutrient[];
}

export default Target;
