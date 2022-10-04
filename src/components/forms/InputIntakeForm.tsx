import ConsumableDataContext
  from "../../store/ConsumableDataContext";
import Select, { extractConsumableItem } from "../ui/Select";

const InputIntakeForm: React.FC<{}> = (props) => {
  return (
    <form className='container mt-2 space-x-2'>
      <Select id='input-intake-form-name' name='name'
        dataContext={ConsumableDataContext}
        extractItem={extractConsumableItem} />
      <input type='datetime-local' defaultValue='2022-01-01 9:30 PM' />
      <input type='number' placeholder='Serving Size' />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default InputIntakeForm;
