import NutrientValueList from "../lists/NutrientValueList";
import Select from "../ui/Select";

const NewConsumableForm: React.FC<{}> = (props) => {
  return (
    <form>
      <div>
        <label htmlFor='new-consumable-name'>Name</label>
        <Select id='new-consumable-name' name='name' />
      </div>
      <div>
        <label htmlFor='new-consumable-category'>Category</label>
        <Select id='new-consumable-category' name='category' />
      </div>
      <div>
        <label htmlFor='new-consumable-unit'>Unit</label>
        <Select id='new-consumable-unit' name='unit' />
      </div>
      <div>
        <label htmlFor='new-consumable-reference-size'>Reference Size</label>
        <input id='new-unit-description' name='reference-size' type='number' />
      </div>
      <NutrientValueList description=''/>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default NewConsumableForm;
