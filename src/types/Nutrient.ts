import Id from "./Id";
import Name from "./Name";
import Unit from "./Unit";

interface Nutrient {
  id: Id;
  name: Name;
  description: string;
  unit: Unit;
  is_macronutrient: boolean;
}

export default Nutrient;
