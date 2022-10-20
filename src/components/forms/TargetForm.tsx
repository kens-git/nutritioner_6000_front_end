import { useContext, useRef, useState } from "react";
import RemoteNutrientValueList from "../lists/RemoteNutrientValueList";
import TargetDataContext from "../../store/TargetDataContext";
import { button_classes, input_classes }
  from "../tailwind_classes";
import ConsumableNutrient from "../../types/ConsumableNutrient";
import { getLatest } from "../../utility/context_utilities";
import Id from "../../types/Id";
import Target from "../../types/Target";

const DESCRIPTION = 'Targets define the desired daily intake for a particular nutrient.';

/**
 * Returns the consumable nutrients of the Target with the highest Id.
 * 
 * @param data The data to search.
 * @returns An array containing the Target's consumable nutrients.
 */
const formatTargetData = (data: Map<Id, Target>) => {
  if(data.size === 0) {
    return [];
  }
  return getLatest(data)!.nutrients;
}

/**
 * A form for submitting a new Target.
 */
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
      nutrients: currentNutrientList.map(nutrient => {
        return {
          nutrient: nutrient.nutrient.id,
          value: nutrient.value
        }
      })
    });
  };

  return (
    <form onSubmit={onSubmit} className='max-w-lg grid grid-cols-2 gap-2'>
      <RemoteNutrientValueList className='col-span-2'
        context={TargetDataContext}
        formatter={formatTargetData}
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
