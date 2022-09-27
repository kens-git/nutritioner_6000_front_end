import LocalConsumableModel
  from '../../models/local/LocalConsumableModel';
import { CONSUMABLE_APPLE, CONSUMABLE_BANANA,
  CONSUMABLE_BACON }
  from '../../test_data/TestConsumables';
import OperationCode from '../../models/types/OperationCode';
import { CATEGORY_FRUIT }
  from '../../test_data/TestConsumableCategories';

describe('LocalConsumableModel', () => {
  test('Get consumables', async () => {
    const model = new LocalConsumableModel();
    const op1 = await model.add_consumable(
      CONSUMABLE_APPLE);
    expect(op1).toBe(OperationCode.SUCCESS);
    const consumables1 = await model.get_consumables();
    expect(consumables1).toMatchObject([CONSUMABLE_APPLE]);
    const op2 = await model.add_consumable(
      CONSUMABLE_BACON);
    expect(op2).toBe(OperationCode.SUCCESS);
    const consumables2 = await model.get_consumables();
    expect(consumables2).toMatchObject([
      CONSUMABLE_APPLE, CONSUMABLE_BACON]);
  });

  test('Get by category', async () => {
    const model = new LocalConsumableModel();
    await model.add_consumable(CONSUMABLE_BACON);
    const consumables1 =
      await model.get_consumables_by_category(
        CATEGORY_FRUIT);
    expect(consumables1).toEqual([]);
    await model.add_consumable(CONSUMABLE_APPLE);
    const consumables2 =
      await model.get_consumables_by_category(
        CATEGORY_FRUIT);
    expect(consumables2).toMatchObject([CONSUMABLE_APPLE]);
    await model.add_consumable(CONSUMABLE_BANANA);
    const consumables3 =
      await model.get_consumables_by_category(
        CATEGORY_FRUIT);
    expect(consumables3).toMatchObject([
      CONSUMABLE_APPLE, CONSUMABLE_BANANA]);
  });

  test('Duplicate consumable', async () => {
    const model = new LocalConsumableModel();
    const op1 = await model.add_consumable(
      CONSUMABLE_APPLE);
    expect(op1).toBe(OperationCode.SUCCESS);
    const names = await model.get_consumables();
    expect(names).toMatchObject([CONSUMABLE_APPLE]);
    const op2 = await model.add_consumable(
      CONSUMABLE_APPLE);
    expect(op2).toBe(OperationCode.DUPLICATE);
    const names2 = await model.get_consumables();
    expect(names2).toMatchObject([CONSUMABLE_APPLE]);
  });
});
