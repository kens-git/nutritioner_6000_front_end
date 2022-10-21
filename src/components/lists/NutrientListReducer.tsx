import ConsumableNutrient from "../../types/ConsumableNutrient";

/** Defines the possible actions that can be performed using the nutrientListReducer. */
export enum NutrientListActionType {

  /**
   * The provided nutrient should be appended to the list.
   * If the nutrient already exists in the state, its value
   * is added to the value of the existing nutrient.
   */
  ADD,

  /** The list is to be emptied. */
  CLEAR,

  /** The provided nutrient is to be removed from the list. */
  REMOVE,

  /**
   * The provided nutrients should override any existing nutrients
   * in the list.
   */
  SET
};

/** Defines the action type for the nutrientListReducer. */
export interface NutrientListAction {

  /** The action type. */
  type: NutrientListActionType;
  
  /** The action payload. */
  payload: any; // TODO: type
}

/**
 * Implements a reducer for manipulating a list of ConsumableNutrients.
 * 
 * @param state The current state of the list.
 * @param action The action to perform.
 * @returns The updated state.
 */
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
