import OperationCode from './types/OperationCode';
import Unit from './types/Unit';

abstract class UnitModel {
  abstract get_units(): Promise<Unit[]>;

  abstract add_unit(unit: Unit): Promise<OperationCode>;
}

export default UnitModel;
