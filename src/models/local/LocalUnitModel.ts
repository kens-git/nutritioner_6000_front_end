import Unit from "../types/Unit";
import UnitModel from "../UnitModel"
import OperationCode from '../types/OperationCode';

class LocalUnitModel extends UnitModel {
  #units: Unit[] = [];

  get_units(): Promise<Unit[]> {
    return new Promise<Unit[]>((resolve, reject) => {
      resolve(this.#units);
    });
  }

  add_unit(unit: Unit): Promise<OperationCode> {
    return new Promise<OperationCode>((resolve, reject) => {
      if(this.#units.indexOf(unit) != -1) {
        resolve(OperationCode.DUPLICATE);
        return;
      }
      this.#units.push(unit);
      resolve(OperationCode.SUCCESS);
    });
  }
}

export default LocalUnitModel;
