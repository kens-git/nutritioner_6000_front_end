import ConsumableCategoryDataContext from "../../store/ConsumableCategoryDataContext";
import NameDataContext from "../../store/NameDataContext";
import NutrientValueList from "../lists/NutrientValueList";
import Select, { extractNameItem, extractUnitItem, extractConsumableCategoryItem }
  from "../ui/Select";
import UnitDataContext from "../../store/UnitDataContext";
import { button_classes, form_classes, input_classes }
  from "../tailwind_classes";

const NewConsumableForm: React.FC<{}> = (props) => {
  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log('submitted');
  };

  return (
    <form className='max-w-lg gap-1.5 grid grid-cols-2' onSubmit={onSubmit}>
      <label htmlFor='new-consumable-name'>Name</label>
      <input className={input_classes} id='new-consumable-name'
        type='text' name='text' />
      <label htmlFor='new-consumable-category'>Category</label>
      <Select id='new-consumable-category' name='category'
        dataContext={ConsumableCategoryDataContext}
        extractItem={extractConsumableCategoryItem}/>
      <label htmlFor='new-consumable-unit'>Unit</label>
      <Select id='new-consumable-unit' name='unit' dataContext={UnitDataContext}
        extractItem={extractUnitItem} />
      <label htmlFor='new-consumable-reference-size'>Reference Size</label>
      <input className={input_classes} id='new-consumable-reference-size' name='reference-size' type='number' min='0' />
      <NutrientValueList className='col-span-2' title='' description=''/>
      <button className={button_classes + ' col-span-2'} type='submit'>Submit</button>
    </form>
  );
}

export default NewConsumableForm;
