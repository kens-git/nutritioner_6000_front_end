import { useContext, useRef, useState } from 'react';
import ConsumableDataContext
  from "../../store/ConsumableDataContext";
import Select from '../ui/Select';
import { extractConsumableItem } from "../ui/SelectItem";
import { button_classes, form_classes, input_classes }
  from "../tailwind_classes";
import IntakeDataContext from '../../store/IntakeDataContext';
import Consumable from '../../types/Consumable';
import Intake from '../../types/Intake';
import { NewIntake } from '../../store/IntakeDataContext';

interface InputIntakeFormProps {
  onSubmit: (intake: Intake) => void;
}

const InputIntakeForm: React.FC<InputIntakeFormProps> = (props) => {
  const [consumable, setConsumable] = useState<Consumable>();
  const [date, setDate] = useState<string>(new Date().toLocaleDateString('en-CA'));
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString('en-CA', { hour12: false }));
  const servingSizeRef = useRef<HTMLInputElement>(null);
  const intakeCtx = useContext(IntakeDataContext);

  const onDateChanged = (event: any) => {
    setDate(event.target.value);
  };

  const onTimeChanged = (event: any) => {
    setTime(event.target.value);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const intake: NewIntake = {
      timestamp: new Date(date + 'T' + time),
      consumable: consumable!.id,
      serving_size: +servingSizeRef.current!.value
    };
    intakeCtx.add(intake).then(id => {
      props.onSubmit(intakeCtx.data.get(id)!);
    });
  };

  return (
    <form onSubmit={onSubmit} className={form_classes}>
      <Select id='input-intake-form-name' name='name'
        dataContext={ConsumableDataContext}
        onChange={setConsumable}
        extractItem={extractConsumableItem} />
      <input className={input_classes} type='date'
        onChange={onDateChanged} defaultValue={date} required />
      <input className={input_classes} type='time'
        onChange={onTimeChanged} defaultValue={time} step={1} required />
      <input ref={servingSizeRef} className={input_classes} type='number'
        placeholder='Serving Size' min={0} required />
      <button className={button_classes}
        type='submit'>Submit</button>
    </form>
  );
}

export default InputIntakeForm;
