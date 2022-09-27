import LocalUnitModel
  from '../../models/local/LocalUnitModel';
import OperationCode from '../../models/types/OperationCode';
import { UNIT_GRAM, UNIT_MILLIGRAM }
  from '../../test_data/TestUnits'

describe('LocalUnitModel', () => {
  test('Get Units', async () => {
    const model = new LocalUnitModel();
    const op1 = await model.add_unit(UNIT_GRAM);
    expect(op1).toBe(OperationCode.SUCCESS);
    const units1 = await model.get_units();
    expect(units1).toMatchObject([UNIT_GRAM]);
    const op2 = await model.add_unit(UNIT_MILLIGRAM);
    expect(op2).toBe(OperationCode.SUCCESS);
    const units2 = await model.get_units();
    expect(units2).toMatchObject(
      [UNIT_GRAM, UNIT_MILLIGRAM]);
  });

  test('Duplicate Unit', async () => {
    const model = new LocalUnitModel();
    const op1 = await model.add_unit(UNIT_GRAM);
    expect(op1).toBe(OperationCode.SUCCESS);
    const units1 = await model.get_units();
    expect(units1).toMatchObject([UNIT_GRAM]);
    const op2 = await model.add_unit(UNIT_GRAM);
    expect(op2).toBe(OperationCode.DUPLICATE);
    const units2 = await model.get_units();
    expect(units2).toMatchObject([UNIT_GRAM]);
  });
});
