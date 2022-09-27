import ConsumableNutrient
  from "../../models/types/ConsumableNutrient";
import LocalDailyValueModel
  from "../../models/local/LocalDailyValueModel";
import Nutrient from "../../models/types/Nutrient";
import User from "../../models/types/User";
import { NUTRIENT_BIOTIN, NUTRIENT_CARBOHYDRATES, NUTRIENT_COPPER, NUTRIENT_FAT, NUTRIENT_IODIDE, NUTRIENT_IRON } from "../../test_data/TestNutrients";
import OperationCode from "../../models/types/OperationCode";

const USER1: User = {
  id: 1,
  username: 'Test User 1'
};

const USER2: User = {
  id: 2,
  username: 'Test User 2'
}

const USER1_VALUES: ConsumableNutrient[] = [
  {
    id: 1,
    nutrient: NUTRIENT_BIOTIN,
    value: 100
  },
  {
    id: 2,
    nutrient: NUTRIENT_CARBOHYDRATES,
    value: 100
  }
];

const USER2_VALUES: ConsumableNutrient[] = [
  {
    id: 3,
    nutrient: NUTRIENT_COPPER,
    value: 100
  },
  {
    id: 4,
    nutrient: NUTRIENT_FAT,
    value: 100
  }
];

const make_test_model = (): LocalDailyValueModel => {
  const model = new LocalDailyValueModel();
  model.set(USER1, USER1_VALUES);
  model.set(USER2, USER2_VALUES);
  return model;
};

describe('LocalDailyValueModel', () => {
  test('Get/set', async () => {
    const model = make_test_model();
    const values1 = await model.get(USER1);
    expect(values1).toMatchObject(USER1_VALUES);
    const updated_values = [...USER1_VALUES];
    updated_values[1].nutrient = NUTRIENT_IODIDE;
    const op = await model.set(USER1, updated_values);
    expect(op).toEqual(OperationCode.SUCCESS);
    const values2 = await model.get(USER1);
    expect(values2).toMatchObject(updated_values);
    const user2_values = await model.get(USER2);
    expect(user2_values).toMatchObject(USER2_VALUES);
  });

  test('Get/set second user', async () => {
    const model = make_test_model();
    const values1 = await model.get(USER2);
    expect(values1).toMatchObject(USER2_VALUES);
    const updated_values = [...USER2_VALUES];
    updated_values[1].nutrient = NUTRIENT_IRON;
    const op = await model.set(USER2, updated_values);
    expect(op).toEqual(OperationCode.SUCCESS);
    const values2 = await model.get(USER2);
    expect(values2).toMatchObject(updated_values);
    const user1_values = await model.get(USER1);
    expect(user1_values).toMatchObject(USER1_VALUES);
  });
});
