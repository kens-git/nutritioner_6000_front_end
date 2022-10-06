import ConsumableNutrient from "./ConsumableNutrient";
import Name from "./Name";

interface Target {
  timestamp: Date;
  name: Name;
  description: string;
  nutrients: ConsumableNutrient[];
}

export default Target;
