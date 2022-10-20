import { useEffect, useReducer } from "react";
import ConsumableNutrient from "../../types/ConsumableNutrient";
import NutrientValueInputListItem, { NutrientValueListItemData }
  from '../lists/NutrientValueInputListItem';
import NutrientValueLabelListItem from './NutrientValueLabelListItem';
import SectionHeader from "../ui/SectionHeader";
import { DataContextData } from '../../store/DataContext';
import Id from "../../types/Id";
import useFormattedDataContextData from '../../hooks/FormattedDataContextData';
import nutrientListReducer, { NutrientListActionType } from './NutrientListReducer';

/** Defines the props accepted by the RemoteNutrientValueList. */
interface RemoteNutrientValueListProps {

  /** The list's displayed title. */
  title: string;

  /** The lists's displayed description. */
  description: string;

  /** The DataContext to load data from. */
  context: React.Context<DataContextData<any, any>>;

  /** Function used to retrieve the DataContext's data as a list. */
  formatter: (data: Map<Id, any>) => ConsumableNutrient[];

  /**
   * Function to call when the list is modified.
   * 
   * @param nutrients The updated list of nutrients.
   */
  onListUpdate: (nutrients: ConsumableNutrient[]) => void;

  /** CSS classes applied to the component. */
  className?: string;
}

/**
 * Component for displaying and modifying a list of nutrient-value pairs,
 * with the initial data being provided by a remote data source.
 */
const RemoteNutrientValueList: React.FC<RemoteNutrientValueListProps> =
    (props) => {
  const [listState, listDispatch] = useReducer(nutrientListReducer, []);
  const nutrientData =
    useFormattedDataContextData(props.context, props.formatter);

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

export default RemoteNutrientValueList;
