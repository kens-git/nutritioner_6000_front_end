import ConsumableCategory from "./types/ConsumableCategory";
import OperationCode from './types/OperationCode';

abstract class ConsumableCategoryModel {
  abstract get_categories(): Promise<ConsumableCategory[]>;

  abstract add_category(
    category: ConsumableCategory): Promise<OperationCode>;
}

export default ConsumableCategoryModel;
