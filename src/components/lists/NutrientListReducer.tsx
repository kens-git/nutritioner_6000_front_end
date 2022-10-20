import ConsumableNutrient from "../../types/ConsumableNutrient";

export enum NutrientListActionType {
  ADD,
  CLEAR,
  REMOVE,
  SET
};

export interface NutrientListAction {
  type: NutrientListActionType;
  payload: any; // TODO: type
}

const nutrientListReducer = (state: ConsumableNutrient[],
    action: NutrientListAction): ConsumableNutrient[] => {
  switch(action.type) {
    case NutrientListActionType.ADD:
      let is_updated = false;
      const updated_list = state.map(item => {
        if(item.nutrient.id === action.payload.nutrient.id) {
          is_updated = true;
          return {...item, value: item.value + action.payload.value};
        }
        return item;
      });
      if(is_updated) {
        return updated_list;
      }
      return [...state, action.payload]
    case NutrientListActionType.CLEAR:
      return [];
    case NutrientListActionType.REMOVE: {
      const updated_list = [...state];
      return updated_list.filter((item, index) => {
        return index !== action.payload; });
    }
    case NutrientListActionType.SET:
      return action.payload;
    default:
      return state;
  }
}

export default nutrientListReducer;
