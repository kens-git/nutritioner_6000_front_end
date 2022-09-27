import ConsumableNutrient from "./types/ConsumableNutrient";
import OperationCode from "./types/OperationCode";
import User from './types/User';

abstract class DailyValueModel {
  abstract set(user: User, nutrients: ConsumableNutrient[]):
    Promise<OperationCode>;

  abstract get(user: User): Promise<ConsumableNutrient[]>;
}

export default DailyValueModel;
