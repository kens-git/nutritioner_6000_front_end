import ConsumableDataContext
  from "../../store/ConsumableDataContext";
import Select, { extractConsumableItem } from "../ui/Select";
import { button_classes, form_classes, input_classes }
  from "../tailwind_classes";

const InputIntakeForm: React.FC<{}> = (props) => {
  return (
    <form className={form_classes}>
      <Select id='input-intake-form-name' name='name'
        dataContext={ConsumableDataContext}
        extractItem={extractConsumableItem} />
      <input className={input_classes} type='datetime-local' defaultValue='2022-01-01 9:30 PM' />
      <input className={input_classes} type='number' placeholder='Serving Size' />
      <button className={button_classes}
        type='submit'>Submit</button>
    </form>
  );
}

export default InputIntakeForm;
