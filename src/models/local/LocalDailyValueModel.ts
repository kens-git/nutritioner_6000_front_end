import ConsumableNutrient from "../types/ConsumableNutrient";
import DailyValueModel from "../DailyValueModel";
import OperationCode from "../types/OperationCode";
import User from '../types/User';
import { resolve } from "path";
import { rejects } from "assert";

class LocalDailyValueModel extends DailyValueModel {
  #daily_values = new Map<number, ConsumableNutrient[]>();

  set(user: User, nutrients: ConsumableNutrient[]):
      Promise<OperationCode> {
    return new Promise<OperationCode>((resolve, reject) => {
      this.#daily_values.set(user.id, nutrients);
      resolve(OperationCode.SUCCESS);
    });
  }

  get(user: User): Promise<ConsumableNutrient[]> {
    return new Promise<ConsumableNutrient[]>(
      (resolve, reject) => {
        if(!this.#daily_values.has(user.id)) {
          resolve([]);
          return;
        }
        resolve(this.#daily_values.get(user.id)!);
      }
    );
  }
}

export default LocalDailyValueModel;
