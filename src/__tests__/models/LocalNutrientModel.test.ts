import LocalNutrientModel
  from "../../models/local/LocalNutrientModel";
import OperationCode from "../../models/types/OperationCode";
import { NUTRIENT_BIOTIN, NUTRIENT_COPPER } from "../../test_data/TestNutrients";

describe('LocalNutrientModel', () => {
  test('Get/add', async () => {
    const model = new LocalNutrientModel();
    const op1 = await model.add(NUTRIENT_BIOTIN);
    expect(op1).toEqual(OperationCode.SUCCESS);
    const op2 = await model.add(NUTRIENT_COPPER);
    expect(op2).toEqual(OperationCode.SUCCESS);
    const op3 = await model.add(NUTRIENT_BIOTIN);
    expect(op3).toEqual(OperationCode.DUPLICATE);
    const values2 = await model.get();
    expect(values2).toMatchObject(
      [NUTRIENT_BIOTIN, NUTRIENT_COPPER]);
  });
});
