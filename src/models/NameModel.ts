import Name from './types/Name';
import OperationCode from './types/OperationCode';

abstract class NameModel {
  abstract get_names(): Promise<Name[]>;

  abstract add_name(name: Name): Promise<OperationCode>;
}

export default NameModel;
