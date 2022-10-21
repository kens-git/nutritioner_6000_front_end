import { button_classes } from '../tailwind_classes';

/** The props accepted by the NutrientValueLabelListItem. */
interface NutrientValueLabelListItemProps {

  /** The nutrient name to display. */
  name: string;
  
  /** The nutrient's amount. */
  value: number;
  
  /** The nutrient's unit */
  unit: string;
  
  /** The index of the item. */
  index: number;
  
  /**
   * Function to call when the component's remove button is clicked.
   * 
   * @param index The index of the removed item.
  */
  onRemove: (index: number) => void;
}

/** A component for displaying a nutrient name and it's associated amount. */
const NutrientValueLabelListItem: React.FC<NutrientValueLabelListItemProps> =
    (props) => {
  const onRemove = (event: any) => {
    event.preventDefault();
    props.onRemove(props.index);
  }
  
  return (
    <div className='grid grid-cols-4 mb-2'>
      <p className='inline col-span-3'>{props.name}: {props.value}{props.unit}</p>
      <button className={button_classes} onClick={onRemove}>Remove</button>
    </div>
  );
}

export default NutrientValueLabelListItem;
