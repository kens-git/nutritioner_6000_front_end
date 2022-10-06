import { button_classes } from '../tailwind_classes';

interface NutrientValueLabelListItemProps {
  name: string;
  value: number;
  unit: string;
  index: number;
  onRemove: (index: number) => void;
}

const NutrientValueLabelListItem: React.FC<NutrientValueLabelListItemProps> = (props) => {
  const onRemove = (event: any) => {
    event.preventDefault();
    props.onRemove(props.index);
  }
  
  return (
    <div className='grid grid-cols-3 max-w-sm mb-2'>
      <p className='inline col-span-2'>{props.name}: {props.value}{props.unit}</p>
      <button className={button_classes} onClick={onRemove}>Remove</button>
    </div>
  );
}

export default NutrientValueLabelListItem;
