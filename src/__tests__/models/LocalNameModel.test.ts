import LocalNameModel
  from '../../models/local/LocalNameModel';
import OperationCode from '../../models/types/OperationCode';
import { NAME_APPLE, NAME_BANANA } from '../../test_data/TestNames';

describe('LocalNameModel', () => {
  test('Get Names', async () => {
    const model = new LocalNameModel();
    const op1 = await model.add_name(NAME_APPLE);
    expect(op1).toBe(OperationCode.SUCCESS);
    const names1 = await model.get_names();
    expect(names1).toMatchObject([NAME_APPLE]);
    const op2 = await model.add_name(NAME_BANANA);
    expect(op2).toBe(OperationCode.SUCCESS);
    const names2 = await model.get_names();
    expect(names2).toMatchObject(
      [NAME_APPLE, NAME_BANANA]);
  });

  test('Duplicate Name', async () => {
    const model = new LocalNameModel();
    const op1 = await model.add_name(NAME_APPLE);
    expect(op1).toBe(OperationCode.SUCCESS);
    const names = await model.get_names();
    expect(names).toMatchObject([NAME_APPLE]);
    const op2 = await model.add_name(NAME_APPLE);
    expect(op2).toBe(OperationCode.DUPLICATE);
    const names2 = await model.get_names();
    expect(names2).toMatchObject([NAME_APPLE]);
  });
});
