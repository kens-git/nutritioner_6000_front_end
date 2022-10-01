import Name from "./Name";
import Unit from "./Unit";

interface Nutrient {
  id: number;
  name: Name;
  description: string;
  unit: Unit;
  is_macronutrient: boolean;
}

export default Nutrient;
