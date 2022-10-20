import { useContext, useEffect, useReducer } from "react";
import NutrientDataContext from "../../store/NutrientDataContext";
import ConsumableNutrient from "../../types/ConsumableNutrient";
import NutrientValueInputListItem, { NutrientValueListItemData }
  from '../lists/NutrientValueInputListItem';
import NutrientValueLabelListItem from './NutrientValueLabelListItem';
import SectionHeader from "../ui/SectionHeader";
import { DataContextData } from '../../store/DataContext';
import Target from '../../types/Target';
import Id from "../../types/Id";
import { getLatest } from "../../utility/context_utilities";
import useFormattedDataContextData from '../../hooks/FormattedDataContextData';
import nutrientListReducer, { NutrientListActionType } from './NutrientListReducer';

interface ContextData {
  context: React.Context<DataContextData<any, any>>;
  formatter: (data: Map<Id, any>) => ConsumableNutrient[];
}

interface NutrientValueListProps {
  title: string;
  description: string;
  contextData: ContextData;
  onListUpdate: (nutrients: ConsumableNutrient[]) => void;
  className?: string;
}

const NutrientValueList: React.FC<NutrientValueListProps> = (props) => {
  const [listState, listDispatch] = useReducer(nutrientListReducer, []);
  const nutrientData =
    useFormattedDataContextData(props.contextData.context, props.contextData.formatter);

  const onItemAdded = (nutrient: NutrientValueListItemData) => {
    listDispatch({
      type: NutrientListActionType.ADD,
      payload: {
        nutrient: nutrient.nutrient,
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

  useEffect(() => {
    if(listState.length === 0) {
      listDispatch({
        type: NutrientListActionType.SET,
        payload: nutrientData
      });
    }
  }, [nutrientData]);

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
      <NutrientValueInputListItem onSubmit={onItemAdded} isDVShown={false} />
    </div>
  );
}

export default NutrientValueList;
