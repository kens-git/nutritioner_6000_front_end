import { useContext, useReducer, useState } from "react";
import NutrientValueList from "../lists/NutrientValueList";
import TargetDataContext from "../../store/TargetDataContext";
import { button_classes } from "../tailwind_classes";
import ConsumableNutrient from "../../types/ConsumableNutrient";

const DESCRIPTION = 'Targets define the desired daily intake for a particular nutrient.';

const TargetForm: React.FC<{}> = (props) => {
  const targetCtx = useContext(TargetDataContext);
  const [currentNutrientList, onListUpdate] =
    useState<ConsumableNutrient[]>([]);

  const onSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className='max-w-lg grid grid-cols-2 gap-2'>
      <NutrientValueList className='col-span-2'
        data={targetCtx.isLoaded ? targetCtx.data : targetCtx.registerLoadCallback}
        onListUpdate={onListUpdate}
        title='Targets' description={DESCRIPTION} />
      <button className={button_classes +' col-span-2'} type='submit'>Submit</button>
    </form>
  );
}

export default TargetForm;
