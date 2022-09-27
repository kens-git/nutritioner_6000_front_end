import Consumable from "../types/Consumable";
import ConsumableCategory from "../types/ConsumableCategory";
import ConsumableModel from "../ConsumableModel";
import OperationCode from "../types/OperationCode";

class LocalConsumableModel extends ConsumableModel {
  #consumables: Consumable[] = [];

  get_consumables(): Promise<Consumable[]> {
    return new Promise<Consumable[]>((resolve, reject) => {
      resolve(this.#consumables);
    });
  }

  get_consumables_by_category(category: ConsumableCategory):
      Promise<Consumable[]> {
    return new Promise<Consumable[]>((resolve, reject) => {
      resolve(this.#consumables.filter((consumable) => {
        return consumable.category === category;
      }));
    });
  }

  add_consumable(
      consumable: Consumable): Promise<OperationCode> {
    return new Promise<OperationCode>((resolve, reject) => {
      if(this.#consumables.indexOf(consumable) != -1) {
        resolve(OperationCode.DUPLICATE);
        return;
      }
      this.#consumables.push(consumable);
      resolve(OperationCode.SUCCESS);
    });
  }
}

export default LocalConsumableModel;
