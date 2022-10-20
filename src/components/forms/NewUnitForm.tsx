import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/AuthContext";
import Select from '../ui/Select';
import { extractNameItem } from "../ui/SelectItem";
import Name from "../../types/Name";
import NameDataContext, { NameDataProvider } from "../../store/NameDataContext";
import UnitDataContext from "../../store/UnitDataContext";
import { button_classes, input_classes }
  from "../tailwind_classes";

/**
 * A form for submitting a new Unit.
 */
const NewUnitForm: React.FC<{}> = (props) => {
  const [name, setName] = useState<Name>();
  const descriptionRef = useRef<HTMLInputElement>(null);
  const unitCtx = useContext(UnitDataContext);

  const onSubmit = (event: any) => {
    event.preventDefault();
    unitCtx.add({
      name: name!.id,
      description: descriptionRef.current!.value
    })
  };

  return (
    <form onSubmit={onSubmit} className='max-w-lg grid grid-cols-2 gap-2'>
      <label htmlFor='new-unit-name'>Name</label>
      <Select id='new-unit-name' name='name'
        dataContext={NameDataContext} extractItem={extractNameItem}
        onChange={setName} />
      <label htmlFor='new-unit-description'>Description</label>
      <input ref={descriptionRef} className={input_classes}
        id='new-unit-description' name='description'
        type='text' placeholder='(Optional)' />
      <button className={button_classes + ' col-span-2'} type='submit'>Submit</button>
    </form>
  );
}

export default NewUnitForm;
