import ConsumableCategory from "./ConsumableCategory";
import Name from './Name'
import Nutrient from './Nutrient'
import Unit from './Unit'

interface Consumable {
  name: Name;
  category: ConsumableCategory;
  unit: Unit;
  reference_size: number;
  nutrients: Nutrient[];
}

export default Consumable;
