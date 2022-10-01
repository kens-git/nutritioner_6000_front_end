import NameDataContext from "../../store/NameDataContext";
import Select, { extractNameItem } from "../ui/Select";

const InputIntakeForm: React.FC<{}> = (props) => {
  return (
    <form>
      <Select id='input-intake-form-name' name='name' dataContext={NameDataContext}
        extractItem={extractNameItem} />
      <input type='datetime-local' defaultValue='2022-01-01 9:30 PM' />
      <input type='number' placeholder='Serving Size' />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default InputIntakeForm;
