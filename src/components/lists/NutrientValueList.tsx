import { useContext, useEffect, useReducer } from "react";
import NutrientDataContext from "../../store/NutrientDataContext";
import ConsumableNutrient from "../../types/ConsumableNutrient";
import NutrientValueInputListItem, { NutrientValueListItemData }
  from "./NutrientValueInputListItem";
import NutrientValueLabelListItem from './NutrientValueLabelListItem';
import nutrientListReducer, { NutrientListActionType } from "./NutrientListReducer";

interface NutrientValueListProps {
  data: ConsumableNutrient[];
  onListUpdate: (nutrients: ConsumableNutrient[]) => void;
  className?: string;
}

const NutrientValueList: React.FC<NutrientValueListProps> = (props) => {
  const nutrientCtx = useContext(NutrientDataContext);
  const [listState, listDispatch] = useReducer(nutrientListReducer, props.data);

  const onItemAdded = (nutrient: NutrientValueListItemData) => {
    listDispatch({
      type: NutrientListActionType.ADD,
      payload: {
        nutrient: nutrientCtx.data.get(nutrient.nutrient)!,
        value: nutrient.value
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
