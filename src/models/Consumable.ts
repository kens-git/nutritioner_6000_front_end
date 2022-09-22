import ConsumableCategory from "./ConsumableCategory";
import ConsumableNutrient from './ConsumableNutrient'
import Name from './Name'
import Unit from './Unit'

interface Consumable {
  id: number;
  name: Name;
  category: ConsumableCategory;
  unit: Unit;
  reference_size: number;
  nutrients: ConsumableNutrient[];
}

export default Consumable;
