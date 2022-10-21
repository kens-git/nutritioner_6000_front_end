import { ConsumableNutrient1, ConsumableNutrient2, ConsumableNutrient3 }
  from '../../test_data';
import ConsumableNutrient from '../../types/ConsumableNutrient';
import nutrientListReducer, { NutrientListActionType } from './NutrientListReducer';

describe('nutrientListReducer', () => {
  test('set', () => {
    expect(nutrientListReducer([], {
      type: NutrientListActionType.SET,
      payload: [ConsumableNutrient1, ConsumableNutrient2]
    }))
    .toStrictEqual([ConsumableNutrient1, ConsumableNutrient2]);
  });

  test('set with previous state', () => {
    expect(nutrientListReducer([ConsumableNutrient1, ConsumableNutrient2], {
      type: NutrientListActionType.SET,
      payload: [ConsumableNutrient2, ConsumableNutrient3]
    }))
    .toStrictEqual([ConsumableNutrient2, ConsumableNutrient3]);
  });
  
  test('add from empty', () => {
    expect(nutrientListReducer([], {
      type: NutrientListActionType.ADD,
      payload: ConsumableNutrient1
    }))
    .toStrictEqual([ConsumableNutrient1]);
  });

  test('add with existing item', () => {
    expect(nutrientListReducer([ConsumableNutrient1], {
      type: NutrientListActionType.ADD,
      payload: ConsumableNutrient2
    }))
    .toStrictEqual([ConsumableNutrient1, ConsumableNutrient2]);
  });

  test('add duplicate', () => {
    expect(nutrientListReducer([ConsumableNutrient1, ConsumableNutrient2], {
      type: NutrientListActionType.ADD,
      payload: ConsumableNutrient2
    }))
    .toStrictEqual([ConsumableNutrient1, {
      ...ConsumableNutrient2,
      value: ConsumableNutrient2.value * 2
    }]);
  });

  test('clear', () => {
    expect(nutrientListReducer([ConsumableNutrient1, ConsumableNutrient2], {
      type: NutrientListActionType.CLEAR,
      payload: null
    }))
    .toStrictEqual([]);
  });

  test('remove first index', () => {
    expect(nutrientListReducer([ConsumableNutrient1, ConsumableNutrient2], {
      type: NutrientListActionType.REMOVE,
      payload: 0
    }))
    .toStrictEqual([ConsumableNutrient2]);
  });

  test('remove with size 1', () => {
    expect(nutrientListReducer([ConsumableNutrient2], {
      type: NutrientListActionType.REMOVE,
      payload: 0
    }))
    .toStrictEqual([]);
  });
});
