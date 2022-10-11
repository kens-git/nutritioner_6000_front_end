import { useContext, useRef, useState } from "react";
import NutrientValueList from "../lists/NutrientValueList";
import TargetDataContext from "../../store/TargetDataContext";
import { button_classes, input_classes }
  from "../tailwind_classes";
import ConsumableNutrient from "../../types/ConsumableNutrient";

const DESCRIPTION = 'Targets define the desired daily intake for a particular nutrient.';

const TargetForm: React.FC<{}> = (props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const targetCtx = useContext(TargetDataContext);
  const [currentNutrientList, setCurrentNutrientList] =
    useState<ConsumableNutrient[]>([]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    targetCtx.set(currentNutrientList, nameRef.current!.value,
      descriptionRef.current!.value);
  };

  return (
    <form onSubmit={onSubmit} className='max-w-lg grid grid-cols-2 gap-2'>
      <NutrientValueList className='col-span-2'
        data={targetCtx.isLoaded ? targetCtx.data : targetCtx.registerLoadCallback}
        onListUpdate={setCurrentNutrientList}
        title='Targets' description={DESCRIPTION} />
      <label htmlFor='target-name'>Name</label>
      <input ref={nameRef} className={input_classes} id='target-name'
        required name='name' type='text' />
      <label htmlFor='target-description'>Description</label>
      <textarea ref={descriptionRef} className={input_classes} rows={2}
        placeholder='(Optional)' />
      <button className={button_classes +' col-span-2'} type='submit'>Submit</button>
    </form>
  );
}

export default TargetForm;
