import ConsumableNutrient from "../types/ConsumableNutrient";
import OperationCode from "../types/OperationCode";
import User from '../types/User';

class LocalTargetModel {
  #targets = new Map<number, ConsumableNutrient[]>();

  get(user: User): Promise<ConsumableNutrient[]> {
    return new Promise<ConsumableNutrient[]>(
      (resolve, reject) => {
        if(!this.#targets.has(user.id)) {
          resolve([]);
          return;
        }
        resolve(this.#targets.get(user.id)!);
      });
  }

  set(user: User, nutrients: ConsumableNutrient[]):
      Promise<OperationCode> {
    return new Promise<OperationCode>((resolve, reject) => {
      this.#targets.set(user.id, nutrients);
      resolve(OperationCode.SUCCESS);
    });
  }
}

export default LocalTargetModel;
