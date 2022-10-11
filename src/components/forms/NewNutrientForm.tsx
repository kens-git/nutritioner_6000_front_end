import { useContext, useRef, useState } from 'react';
import Name from '../../types/Name';
import NameDataContext from "../../store/NameDataContext";
import Select, { extractNameItem, extractUnitItem } from "../ui/Select";
import UnitDataContext from "../../store/UnitDataContext";
import { button_classes, input_classes }
  from "../tailwind_classes";
import Unit from '../../types/Unit';
import NutrientDataContext from '../../store/NutrientDataContext';

const NewNutrientForm: React.FC<{}> = (props) => {
  const [name, setName] = useState<Name>();
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [unit, setUnit] = useState<Unit>();
  const isMacronutrientRef = useRef<HTMLInputElement>(null);
  const nutrientCtx = useContext(NutrientDataContext);

  const onSubmit = (event: any) => {
    event.preventDefault();
    nutrientCtx.add({
      id: -1,
      name: name!,
      description: descriptionRef.current!.value,
      unit: unit!,
      is_macronutrient: isMacronutrientRef.current!.checked
    });
  };

  return (
    <form onSubmit={onSubmit} className='grid grid-cols-2 gap-2 max-w-lg'>
      <label htmlFor='new-nutrient-name'>Name</label>
      <Select id='new-nutrient-name' name='name' dataContext={NameDataContext}
        onChange={setName} extractItem={extractNameItem} />
      <label htmlFor='new-unit-description'>Description</label>
      <input ref={descriptionRef} className={input_classes}
        id='new-unit-description' name='description'
        type='text' placeholder='(Optional)' />
      <label htmlFor='new-nutrient-unit'>Unit</label>
      <Select id='new-nutrient-unit' name='unit' dataContext={UnitDataContext}
        onChange={setUnit} extractItem={extractUnitItem} />
      <label htmlFor='new-nutrient-is-macronutrient'>Macronutrient</label>
      <input ref={isMacronutrientRef}
        className={`${input_classes} justify-self-start`}
        id='new-nutrient-is-macronutrient' name='macronutrient'
        type='checkbox' />
      <button className={button_classes + ' col-span-2'} type='submit'>Submit</button>
    </form>
  );
}

export default NewNutrientForm;
