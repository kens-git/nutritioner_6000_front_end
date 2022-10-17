import ConsumableNutrient from "./ConsumableNutrient";
import Id from "./Id";

interface DailyValue {
  id: Id;
  nutrients: ConsumableNutrient[];
}

export default DailyValue;
