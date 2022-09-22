import Select from "../ui/Select";

const NewNutrientForm: React.FC<{}> = (props) => {
  return (
    <form>
      <div>
        <label htmlFor='new-nutrient-name'>Name</label>
        <Select id='new-nutrient-name' name='name' />
      </div>
      <div>
        <label htmlFor='new-unit-description'>Description</label>
        <input id='new-unit-description' name='description' type='text' />
      </div>
      <div>
        <label htmlFor='new-nutrient-unit'>Unit</label>
        <Select id='new-nutrient-unit' name='unit' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default NewNutrientForm;
