import ConsumableCategory
  from "../types/ConsumableCategory";
import ConsumableCategoryModel
  from '../ConsumableCategoryModel';
import OperationCode from '../types/OperationCode';

class LocalConsumableCategoryModel extends
    ConsumableCategoryModel {
  #categories: ConsumableCategory[] = [];

  get_categories(): Promise<ConsumableCategory[]> {
    return new Promise<ConsumableCategory[]>(
      (resolve, reject) => {
        resolve(this.#categories);
      });
  }

  add_category(category: ConsumableCategory):
      Promise<OperationCode> {
    return new Promise<OperationCode>((resolve, reject) => {
      if(this.#categories.indexOf(category) != -1) {
        resolve(OperationCode.DUPLICATE);
        return;
      }
      this.#categories.push(category);
      resolve(OperationCode.SUCCESS);
    });
  }
}

export default LocalConsumableCategoryModel;
