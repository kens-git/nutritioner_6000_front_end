import Select, { extractNameItem } from "../ui/Select";
import NameDataContext from '../../store/NameDataContext';
import { button_classes, input_classes }
  from "../tailwind_classes";

const NewConsumableCategoryForm: React.FC<{}> = (props) => {
  const onSubmit = (event: any) => {
    event.preventDefault();
  };
  
  return (
    <form onSubmit={onSubmit} className='max-w-lg grid grid-cols-2 gap-2'>
      <label htmlFor='new-consumable-category-name'>Name</label>
      <Select id='new-consumable-category-name' name='name' dataContext={NameDataContext}
        extractItem={extractNameItem}/>
      <label htmlFor='new-consumable-category-description'>Description</label>
      <input className={input_classes} id='new-consumable-category-description' name='description' type='text' />
      <button className={button_classes + ' col-span-2'}
        type='submit'>Submit</button>
    </form>
  )
}

export default NewConsumableCategoryForm;
