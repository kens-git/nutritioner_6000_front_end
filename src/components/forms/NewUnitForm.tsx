import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import Select, { extractNameItem } from "../ui/Select";
import NameDataContext, { NameDataProvider } from "../../store/NameDataContext";
import { button_classes, input_classes }
  from "../tailwind_classes";

const NewUnitForm: React.FC<{}> = (props) => {
  const authCtx = useContext(AuthContext);

  const onSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className='max-w-lg grid grid-cols-2 gap-2'>
      <label htmlFor='new-unit-name'>Name</label>
      <Select id='new-unit-name' name='name'
        dataContext={NameDataContext} extractItem={extractNameItem} />
      <label htmlFor='new-unit-description'>Description</label>
      <input className={input_classes} id='new-unit-description' name='description' type='text' />
      <button className={button_classes + ' col-span-2'} type='submit'>Submit</button>
    </form>
  );
}

export default NewUnitForm;
