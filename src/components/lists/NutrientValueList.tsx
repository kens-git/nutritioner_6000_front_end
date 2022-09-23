import Select from "../ui/Select";

const NutrientValueInputListItem: React.FC<{}> = (props) => {
  return (
    <form>
      <Select />
      <input name='value' type='number' required placeholder='Placeholder plz change' />
      <input id='nutrient-value-input-scalar' name='value-type' value='scalar' type='radio' defaultChecked />
      <label htmlFor='nutrient-value-input-scalar'>Grams (TODO)</label>
      <input id='nutrient-value-input-dv' name='value-type' value='dv-pct' type='radio' />
      <label htmlFor='nutrient-value-input-dv'>DV%</label>
      <button>Add</button>
    </form>
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
