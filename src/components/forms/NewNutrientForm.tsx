import NameDataContext from "../../store/NameDataContext";
import Select, { extractNameItem, extractUnitItem } from "../ui/Select";
import UnitDataContext from "../../store/UnitDataContext";
import { button_classes, input_classes }
  from "../tailwind_classes";

const NewNutrientForm: React.FC<{}> = (props) => {
  return (
    <form className='grid grid-cols-2 gap-2 max-w-lg'>
      <label htmlFor='new-nutrient-name'>Name</label>
      <Select id='new-nutrient-name' name='name' dataContext={NameDataContext}
        extractItem={extractNameItem} />
      <label htmlFor='new-unit-description'>Description</label>
      <input className={input_classes} id='new-unit-description' name='description' type='text' />
      <label htmlFor='new-nutrient-unit'>Unit</label>
      <Select id='new-nutrient-unit' name='unit' dataContext={UnitDataContext}
        extractItem={extractUnitItem} />
      <button className={button_classes + ' col-span-2'} type='submit'>Submit</button>
    </form>
  );
}

export default NewNutrientForm;
