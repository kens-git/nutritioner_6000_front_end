import Nutrient from "./types/Nutrient";
import OperationCode from "./types/OperationCode";

abstract class NutrientModel {
  abstract get(): Promise<Nutrient[]>;

  abstract add(nutrient: Nutrient): Promise<OperationCode>;
}

export default NutrientModel;
