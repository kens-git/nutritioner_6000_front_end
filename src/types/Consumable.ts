import ConsumableCategory from "./ConsumableCategory";
import ConsumableNutrient from './ConsumableNutrient'
import Id from "./Id";
import Unit from './Unit'

interface Consumable {
  id: Id;
  name: string;
  category: ConsumableCategory;
  unit: Unit;
  reference_size: number;
  nutrients: ConsumableNutrient[];
}

export default Consumable;
