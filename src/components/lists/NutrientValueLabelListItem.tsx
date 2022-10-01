interface NutrientValueLabelListItemProps {
  name: string;
  value: number;
  unit: string;
  index: number;
  onRemove: (index: number) => void;
}

const NutrientValueLabelListItem: React.FC<NutrientValueLabelListItemProps> = (props) => {
  const onRemove = (event: any) => {
    props.onRemove(props.index);
  }
  
  return (
    <div>
      <p>{props.name}: {props.value}{props.unit}</p>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

export default NutrientValueLabelListItem;
