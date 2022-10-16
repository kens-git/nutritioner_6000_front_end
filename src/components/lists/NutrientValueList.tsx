import { useContext, useEffect, useReducer } from "react";
import NutrientDataContext from "../../store/NutrientDataContext";
import ConsumableNutrient from "../../types/ConsumableNutrient";
import NutrientValueInputListItem, { NutrientValueListItemData }
  from "./NutrientValueInputListItem";
import NutrientValueLabelListItem from './NutrientValueLabelListItem';
import SectionHeader from "../ui/SectionHeader";
import { RegisterCallback } from '../../store/TargetDataContext';

interface NutrientValueListProps {
  title: string;
  description: string;
  data: ConsumableNutrient[] | RegisterCallback;
  onListUpdate: (nutrients: ConsumableNutrient[]) => void;
  className?: string;
}

enum NutrientListActionType {
  ADD,
  CLEAR,
  REMOVE,
  SET
};

interface NutrientListAction {
  type: NutrientListActionType;
  payload: any;
}

const listReducer = (state: ConsumableNutrient[],
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

const NutrientValueList: React.FC<NutrientValueListProps> = (props) => {
  const nutrientCtx = useContext(NutrientDataContext);
  const [listState, listDispatch] = useReducer(listReducer, []);

  const onItemAdded = (nutrient: NutrientValueListItemData) => {
    // TODO: needs to convert DVs to scalars
    listDispatch({
      type: NutrientListActionType.ADD,
      payload: {
        nutrient: nutrientCtx.data.get(nutrient.nutrient_id)!,
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

  const onDataLoaded = (data: ConsumableNutrient[]) => {
    if(listState.length !== 0) {
      return;
    }
    listDispatch({
      type: NutrientListActionType.SET,
      payload: data
    })
  }

  useEffect(() => {
    props.onListUpdate(listState);
  }, [listState]);

  useEffect(() => {
    if(props.data instanceof Array<ConsumableNutrient>) {
      listDispatch({
        type: NutrientListActionType.SET,
        payload: props.data
      })
    } else {
      props.data(onDataLoaded);
    }
  }, []);

  return (
    <div className={props.className ? props.className! : ''}>
      <SectionHeader label={props.title}/>
      <h2 className='mb-2'>{props.description}</h2>
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
      <NutrientValueInputListItem onSubmit={onItemAdded} />
    </div>
  );
}

export default NutrientValueList;
