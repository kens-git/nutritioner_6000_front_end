import Select from "../ui/Select";

const NutrientValueInputListItem: React.FC<{}> = (props) => {
  return (
    <div>
      <Select />
      <input type='number' placeholder='Target Value' />
      <button>Add</button>
    </div>
  );
}

interface NutrientValueLabelListItemProps {
  label: string;
  value: number;
}

const NutrientValueLabelListItem: React.FC<NutrientValueLabelListItemProps> = (props) => {
  return (
    <div>
      <p>{props.label}: {props.value}</p>
      <button>Remove</button>
    </div>
  );
}


interface NutrientValueListProps {
  description: string,
}

const NutrientValueList: React.FC<NutrientValueListProps> = (props) => {
  return (
    <div>
      <h1>NutrientValueList Title</h1>
      <h2>{props.description}</h2>
      <NutrientValueLabelListItem label='Fat (g)' value={100} />
      <NutrientValueLabelListItem label='Carbohydrates (g)' value={80}/>
      <NutrientValueLabelListItem label='Sugar (g)' value={230}/>
      <NutrientValueLabelListItem label='Protein (g)' value={10}/>
      <NutrientValueInputListItem />
    </div>
  );
}

export default NutrientValueList;
