import { useContext, useRef, useState } from 'react';
import ConsumableCategoryDataContext from "../../store/ConsumableCategoryDataContext";
import NutrientValueList from "../lists/NutrientValueList";
import Select, { extractNameItem, extractUnitItem, extractConsumableCategoryItem }
  from "../ui/Select";
import UnitDataContext from "../../store/UnitDataContext";
import { button_classes, form_classes, input_classes }
  from "../tailwind_classes";
import ConsumableCategory from '../../types/ConsumableCategory';
import Unit from '../../types/Unit';
import ConsumableNutrient from '../../types/ConsumableNutrient';
import ConsumableDataContext from '../../store/ConsumableDataContext';

const NewConsumableForm: React.FC<{}> = (props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<ConsumableCategory>();
  const [unit, setUnit] = useState<Unit>();
  const referenceSizeRef = useRef<HTMLInputElement>(null);
  const [nutrientList, setNutrientList] = useState<ConsumableNutrient[]>([]);
  const consumableCtx = useContext(ConsumableDataContext);

  const onSubmit = (event: any) => {
    event.preventDefault();
    consumableCtx.add({
      id: -1,
      name: nameRef.current!.value,
      category: category!,
      unit: unit!,
      reference_size: +referenceSizeRef.current!.value,
      nutrients: nutrientList
    });
  };

  return (
    <form className='max-w-lg gap-1.5 grid grid-cols-2' onSubmit={onSubmit}>
      <label htmlFor='new-consumable-name'>Name</label>
      <input ref={nameRef} className={input_classes} id='new-consumable-name'
        type='text' name='text' />
      <label htmlFor='new-consumable-category'>Category</label>
      <Select id='new-consumable-category' name='category'
        dataContext={ConsumableCategoryDataContext}
        extractItem={extractConsumableCategoryItem}
        onChange={setCategory} />
      <label htmlFor='new-consumable-unit'>Unit</label>
      <Select id='new-consumable-unit' name='unit' dataContext={UnitDataContext}
        extractItem={extractUnitItem} onChange={setUnit} />
      <label htmlFor='new-consumable-reference-size'>Reference Size</label>
      <input ref={referenceSizeRef} className={input_classes}
        id='new-consumable-reference-size' name='reference-size' type='number' min='0' />
      <NutrientValueList className='col-span-2' data={[]}
        onListUpdate={setNutrientList} title='' description=''/>
      <button className={button_classes + ' col-span-2'} type='submit'>Submit</button>
    </form>
  );
}

export default NewConsumableForm;
