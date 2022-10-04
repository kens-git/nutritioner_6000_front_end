import NutrientValueList from "../lists/NutrientValueList";
import { button_classes } from "../tailwind_classes";

const DESCRIPTION = `Daily values are reference values used to convert micronutrient \
percentage values to a value with a unit. For instance, if the daily value for Vitamin C is
500mg, and a consumable has 50% of the daily value of Vitamin C in a single serving then that \
serving has 250mg of Vitamin C. These values are used when inputting new consumables if the \
value for a particular nutrient is given as a percentage. The default values are based on \
Health Canada's document, Nutrition Labeling: Table of Daily Values.`;

const DailyValueForm: React.FC<{}> = (props) => {
  return (
    <form className='max-w-lg grid grid-cols-2 gap-2'>
      <NutrientValueList className='col-span-2' title='Daily Values' description={DESCRIPTION} />
      <button className={button_classes + ' col-span-2'} type='submit'>Submit</button>
    </form>
  );
}

export default DailyValueForm;
