import Nutrient from "../types/Nutrient";
import OperationCode from "../types/OperationCode";

class LocalNutrientModel {
  #nutrients: Nutrient[] = [];

  get(): Promise<Nutrient[]> {
    return new Promise<Nutrient[]>((resolve, reject) => {
      resolve(this.#nutrients);
    });
  }

  add(nutrient: Nutrient): Promise<OperationCode> {
    return new Promise<OperationCode>((resolve, reject) => {
      if(this.#nutrients.filter(
          i => i.id == nutrient.id).length > 0) {
        resolve(OperationCode.DUPLICATE);
        return;
      }
      this.#nutrients.push(nutrient);
      resolve(OperationCode.SUCCESS);
    });
  }
}

export default LocalNutrientModel;
