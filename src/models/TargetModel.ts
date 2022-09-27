import ConsumableNutrient from "./types/ConsumableNutrient";
import OperationCode from "./types/OperationCode";
import User from './types/User';

abstract class TargetModel {
  abstract get(user: User): Promise<ConsumableNutrient[]>;

  abstract set(user: User, nutrients: ConsumableNutrient[]):
    Promise<OperationCode>;
}

export default TargetModel;
