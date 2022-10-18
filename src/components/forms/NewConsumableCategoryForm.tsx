import { useRef, useState } from "react";
import Select, { extractNameItem } from "../ui/Select";
import NameDataContext from '../../store/NameDataContext';
import Name from "../../types/Name";
import { button_classes, input_classes }
  from "../tailwind_classes";
import { useContext } from "react";
import ConsumableCategoryDataContext from "../../store/ConsumableCategoryDataContext";

const NewConsumableCategoryForm: React.FC<{}> = (props) => {
  const [name, setName] = useState<Name>();
  const descriptionRef = useRef<HTMLInputElement>(null);
  const categoryCtx = useContext(ConsumableCategoryDataContext);

  const onSubmit = (event: any) => {
    event.preventDefault();
    categoryCtx.add({
      name: name!.id,
      description: descriptionRef.current!.value
    });
  };
  
  return (
    <form onSubmit={onSubmit} className='max-w-lg grid grid-cols-2 gap-2'>
      <label htmlFor='new-consumable-category-name'>Name</label>
      <Select id='new-consumable-category-name' name='name' dataContext={NameDataContext}
        extractItem={extractNameItem} onChange={setName} />
      <label htmlFor='new-consumable-category-description'>Description</label>
      <input ref={descriptionRef} className={input_classes}
        id='new-consumable-category-description'
        name='description' type='text'
        placeholder='(Optional)' />
      <button className={button_classes + ' col-span-2'}
        type='submit'>Submit</button>
    </form>
  )
}

export default NewConsumableCategoryForm;
