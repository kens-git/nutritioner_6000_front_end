import Intake from "../../models/types/Intake";
import LocalIntakeModel
  from "../../models/local/LocalIntakeModel";
import { CONSUMABLE_APPLE, CONSUMABLE_BANANA }
  from "../../test_data/TestConsumables";
import User from "../../models/types/User";

const USER1: User = {
  id: 1,
  username: 'Test User'
};

const USER2: User = {
  id: 2,
  username: 'Test User 2'
};

const INTAKE1: Intake = {
  id: 1,
  timestamp: new Date(2022, 7, 6, 12, 0, 0, 0),
  consumable: CONSUMABLE_APPLE,
  serving_size: 1
};

const INTAKE2: Intake = {
  id: 2,
  timestamp: new Date(2022, 7, 7, 12, 0, 0, 0),
  consumable: CONSUMABLE_APPLE,
  serving_size: 1
};

const INTAKE3: Intake = {
  id: 3,
  timestamp: new Date(2022, 7, 7, 12, 0, 0, 0),
  consumable: CONSUMABLE_BANANA,
  serving_size: 1
};

const INTAKE4: Intake = {
  id: 4,
  timestamp: new Date(2022, 7, 8, 12, 0, 0, 0),
  consumable: CONSUMABLE_APPLE,
  serving_size: 1
};

const INTAKE5: Intake = {
  id: 5,
  timestamp: new Date(2022, 7, 7, 12, 0, 0, 0),
  consumable: CONSUMABLE_APPLE,
  serving_size: 1
};

const make_test_model = (): LocalIntakeModel => {
  const model = new LocalIntakeModel();
  model.add_intake(USER1, INTAKE1);
  model.add_intake(USER1, INTAKE2);
  model.add_intake(USER1, INTAKE3);
  model.add_intake(USER1, INTAKE4);
  model.add_intake(USER2, INTAKE5);
  return model;
};

describe('LocalIntakeModel', () => {
  test('Get day', async () => {
    const model = make_test_model();
    const intakes = await model.get_intakes(
      USER1, new Date(2022, 7, 7, 12, 0, 0, 0));
    expect(intakes).toMatchObject(
      [INTAKE2, INTAKE3]);
  });

  test('Get day second user', async () => {
    const model = make_test_model();
    const intakes = await model.get_intakes(
      USER2, new Date(2022, 7, 7, 12, 0, 0, 0));
    expect(intakes).toMatchObject([INTAKE5]);
  });

  test('Get range', async () => {
    const model = make_test_model();
    const intakes = await model.get_intakes_range(
      USER1, new Date(2022, 7, 6, 12, 0, 0, 0),
      new Date(2022, 7, 7, 12, 0, 0, 0));
    expect(intakes).toMatchObject(
      [INTAKE1, INTAKE2, INTAKE3]);
  });

  test('Get range second user', async () => {
    const model = make_test_model();
    const intakes = await model.get_intakes_range(
      USER2, new Date(2022, 7, 6, 12, 0, 0, 0),
      new Date(2022, 7, 7, 12, 0, 0, 0));
    expect(intakes).toMatchObject([INTAKE5]);
  });
});
