import NutrientValueList from "../lists/NutrientValueList";
import { button_classes } from "../tailwind_classes";

const DESCRIPTION = 'Targets define the desired daily intake for a particular nutrient.';

const TargetForm: React.FC<{}> = (props) => {
  return (
    <form className='max-w-lg grid grid-cols-2 gap-2'>
      <NutrientValueList className='col-span-2' title='Targets' description={DESCRIPTION} />
      <button className={button_classes +' col-span-2'} type='submit'>Submit</button>
    </form>
  );
}

export default TargetForm;
