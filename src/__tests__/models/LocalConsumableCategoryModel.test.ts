import LocalConsumableCategoryModel
  from '../../models/local/LocalConsumableCategoryModel';
import OperationCode from '../../models/types/OperationCode';
import { CATEGORY_DAIRY, CATEGORY_FRUIT }
  from '../../test_data/TestConsumableCategories';

describe('LocalConsumableCategoryModel', () => {
  test('Get Categories', async () => {
    const model = new LocalConsumableCategoryModel();
    const op1 = await model.add_category(
      CATEGORY_DAIRY);
    expect(op1).toBe(OperationCode.SUCCESS);
    const categories1 = await model.get_categories();
    expect(categories1).toMatchObject([CATEGORY_DAIRY]);
    const op2 = await model.add_category(CATEGORY_FRUIT);
    expect(op2).toBe(OperationCode.SUCCESS);
    const categories2 = await model.get_categories();
    expect(categories2).toMatchObject(
      [CATEGORY_DAIRY, CATEGORY_FRUIT]);
  });

  test('Duplicate Category', async () => {
    const model = new LocalConsumableCategoryModel();
    const op1 = await model.add_category(CATEGORY_DAIRY);
    expect(op1).toBe(OperationCode.SUCCESS);
    const categories1 = await model.get_categories();
    expect(categories1).toMatchObject([CATEGORY_DAIRY]);
    const op2 = await model.add_category(CATEGORY_DAIRY);
    expect(op2).toBe(OperationCode.DUPLICATE);
    const categories2 = await model.get_categories();
    expect(categories2).toMatchObject([CATEGORY_DAIRY]);
  });
});
