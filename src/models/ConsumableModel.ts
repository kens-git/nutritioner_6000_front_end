import Consumable from './types/Consumable';
import ConsumableCategory from './types/ConsumableCategory';
import OperationCode from './types/OperationCode';

abstract class ConsumableModel {
  abstract get_consumables(): Promise<Consumable[]>;

  abstract get_consumables(
    category: ConsumableCategory): Promise<Consumable[]>;

  abstract add_consumable(
    consumable: Consumable): Promise<OperationCode>;
}

export default ConsumableModel;
