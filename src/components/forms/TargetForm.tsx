import { useContext, useRef, useState } from "react";
import RemoteNutrientValueList from "../lists/RemoteNutrientValueList";
import TargetDataContext from "../../store/TargetDataContext";
import { button_classes, input_classes }
  from "../tailwind_classes";
import ConsumableNutrient from "../../types/ConsumableNutrient";
import { getLatest } from "../../utility/context_utilities";
import useFormattedDataContextData from "../../hooks/FormattedDataContextData";
import Id from "../../types/Id";
import Target from "../../types/Target";

const DESCRIPTION = 'Targets define the desired daily intake for a particular nutrient.';

const formatTargetData = (data: Map<Id, Target>) => {
  if(data.size === 0) {
    return [];
  }
  return getLatest(data)!.nutrients;
}

const TargetForm: React.FC<{}> = (props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const targetCtx = useContext(TargetDataContext);
  const [currentNutrientList, setCurrentNutrientList] =
    useState<ConsumableNutrient[]>([]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    targetCtx.add({
      timestamp: new Date().toISOString(),
      name: nameRef.current!.value,
      description: descriptionRef.current!.value,
      nutrients: currentNutrientList
    });
  };

  return (
    <form onSubmit={onSubmit} className='max-w-lg grid grid-cols-2 gap-2'>
      <RemoteNutrientValueList className='col-span-2'
        contextData={{
          context: TargetDataContext,
          formatter: formatTargetData
        }}
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
