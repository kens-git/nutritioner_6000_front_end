import { OperationCanceledException } from "typescript";
import LocalTargetModel
  from "../../models/local/LocalTargetModel";
import ConsumableNutrient
  from "../../models/types/ConsumableNutrient";
import OperationCode from "../../models/types/OperationCode";
import User from "../../models/types/User";
import { NUTRIENT_BIOTIN, NUTRIENT_COPPER, NUTRIENT_FAT,
  NUTRIENT_IODIDE, 
  NUTRIENT_IRON,
  NUTRIENT_ZINC} from "../../test_data/TestNutrients";

const USER1: User = {
  id: 1,
  username: 'Test User 1'
}

const USER2: User = {
  id: 2,
  username: 'Test User 2'
}

const USER1_TARGETS: ConsumableNutrient[] = [
  {
    id: 1,
    nutrient: NUTRIENT_BIOTIN,
    value: 1
  },
  {
    id: 2,
    nutrient: NUTRIENT_COPPER,
    value: 1
  }
];

const USER2_TARGETS: ConsumableNutrient[] = [
  {
    id: 3,
    nutrient: NUTRIENT_FAT,
    value: 1
  },
  {
    id: 4,
    nutrient: NUTRIENT_IODIDE,
    value: 1
  }
];

const make_test_model = (): LocalTargetModel => {
  const model = new LocalTargetModel();
  model.set(USER1, USER1_TARGETS);
  model.set(USER2, USER2_TARGETS);
  return model;
};

describe('LocalTargetModel', () => {
  test('Get/set', async () => {
    const model = make_test_model();
    const values = await model.get(USER1);
    expect(values).toMatchObject(USER1_TARGETS);
    values[1].nutrient = NUTRIENT_IRON;
    const op = await model.set(USER1, values);
    expect(op).toEqual(OperationCode.SUCCESS);
    const values2 = await model.get(USER1);
    expect(values2).toMatchObject(values);
  });

  test('Get/set second user', async () => {
    const model = make_test_model();
    const values = await model.get(USER2);
    expect(values).toMatchObject(USER2_TARGETS);
    values[1].nutrient = NUTRIENT_ZINC;
    const op = await model.set(USER2, values);
    expect(op).toEqual(OperationCode.SUCCESS);
    const values2 = await model.get(USER2);
    expect(values2).toMatchObject(values);
  });
});
