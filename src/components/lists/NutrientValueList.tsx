import { useContext, useEffect, useReducer } from "react";
import NutrientDataContext from "../../store/NutrientDataContext";
import ConsumableNutrient from "../../types/ConsumableNutrient";
import NutrientValueInputListItem, { NutrientValueListItemData }
  from "./NutrientValueInputListItem";
import NutrientValueLabelListItem from './NutrientValueLabelListItem';
import nutrientListReducer, { NutrientListActionType } from "./NutrientListReducer";

/** Defines the props accepted by the NutrientValueList. */
interface NutrientValueListProps {

  /** The initial data to display. */
  data: ConsumableNutrient[];

  /**
   * Function to call when the list is modified.
   * 
   * @param nutrients The updated list of nutrients.
   */
  onListUpdate: (nutrients: ConsumableNutrient[]) => void;
  
  /** CSS classes applied to the component. */
  className?: string;
}

/** Component for displaying and modifying a list of nutrient-value pairs. */
const NutrientValueList: React.FC<NutrientValueListProps> = (props) => {
  const [listState, listDispatch] = useReducer(nutrientListReducer, props.data);

  const onItemAdded = (data: NutrientValueListItemData) => {
    listDispatch({
      type: NutrientListActionType.ADD,
      payload: {
        nutrient: data.nutrient,
        value: data.value
      }
    });
  }

  const onItemRemoved = (removed_index: number) => {
    listDispatch({
      type: NutrientListActionType.REMOVE,
      payload: removed_index
    });
  }

  useEffect(() => {
    props.onListUpdate(listState);
  }, [listState]);

  return (
    <div className={props.className ? props.className! : ''}>
      {listState.length == 0 &&
        <h2 className='italic text-gray-500'>No data to display.</h2>}
      {listState.map((nutrient: ConsumableNutrient, index: number) => {
        return <NutrientValueLabelListItem
          key={index}
          name={nutrient.nutrient.name.name}
          value={nutrient.value}
          unit={nutrient.nutrient.unit.name.abbreviation}
          index={index}
          onRemove={onItemRemoved} />
      })}
      <NutrientValueInputListItem onSubmit={onItemAdded} isDVShown={true} />
    </div>
  );
}

export default NutrientValueList;
