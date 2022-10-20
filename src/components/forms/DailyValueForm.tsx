import { useContext, useState } from 'react';
import DailyValueDataContext from "../../store/DailyValueDataContext";
import ConsumableNutrient from '../../types/ConsumableNutrient';
import DailyValue from '../../types/DailyValue';
import RemoteNutrientValueList from "../lists/RemoteNutrientValueList";
import { button_classes } from "../tailwind_classes";
import Id from '../../types/Id';
import { getLatest } from '../../utility/context_utilities';
import useFormattedDataContextData from '../../hooks/FormattedDataContextData';

const DESCRIPTION = `Daily values are reference values used to convert micronutrient \
percentage values to a value with a unit. For instance, if the daily value for vitamin C is
500mg, and a consumable has 50% of the daily value of Vitamin C in a single serving then that \
serving has 250mg of Vitamin C. These values are used when inputting new consumables if the \
value for a particular nutrient is given as a percentage. The default values are based on \
Health Canada's document, Nutrition Labeling: Table of Daily Values.`;

const formatDailyValueData = (data: Map<Id, DailyValue>) => {
  if(data.size === 0) {
    return [];
  }
  return getLatest(data)!.nutrients;
}

const DailyValueForm: React.FC<{}> = (props) => {
  const dailyValueCtx = useContext(DailyValueDataContext);
  const [currentNutrientList, setCurrentNutrientList] =
    useState<ConsumableNutrient[]>([]);
    const dailyValueNutrients =
      useFormattedDataContextData(DailyValueDataContext, formatDailyValueData);

  const onSubmit = (event: any) => {
    event.preventDefault();
    dailyValueCtx.add({
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
        contextData={{
          context: DailyValueDataContext,
          formatter: formatDailyValueData
        }}
        onListUpdate={setCurrentNutrientList}
        title='Daily Values'
        description={DESCRIPTION} />
      <button className={button_classes + ' col-span-2'} type='submit'>Submit</button>
    </form>
  );
}

export default DailyValueForm;
