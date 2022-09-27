import Name from "../types/Name";
import NameModel from "../NameModel"
import OperationCode from "../types/OperationCode";

/**
 * Implements a NameModel in memory.
 */
class LocalNameModel extends NameModel {
  #names: Name[] = [];

  get_names(): Promise<Name[]> {
    return new Promise<Name[]>((resolve, reject) => {
      resolve(this.#names);
    });
  }

  add_name(name: Name): Promise<OperationCode> {
    return new Promise<OperationCode>((resolve, reject) => {
      if(this.#names.indexOf(name) != -1) {
        resolve(OperationCode.DUPLICATE);
        return;
      }
      this.#names.push(name);
      resolve(OperationCode.SUCCESS);
    });
  }
}

export default LocalNameModel;
