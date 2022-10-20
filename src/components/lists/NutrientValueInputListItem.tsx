import { useRef, useState } from 'react';
import Nutrient from '../../types/Nutrient';
import NutrientDataContext from '../../store/NutrientDataContext';
import Select from '../ui/Select';
import { extractNutrientItem } from '../ui/SelectItem';
import { button_classes, form_classes, input_classes }
  from '../tailwind_classes';

export interface NutrientValueListItemData {
  // TODO: can this just store the Nutrient instead of the id?
  nutrient_id: number;
  value: number;
  isDV: boolean;
}

interface NutrientValueInputListItemProps {
  onSubmit: (data: NutrientValueListItemData) => void;
}

const NutrientValueInputListItem:
    React.FC<NutrientValueInputListItemProps> = (props) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const scalarRef = useRef<HTMLInputElement>(null);
  const [unit, setUnit] = useState('');

  const onSubmit = () => {
    if(valueRef.current!.value && +valueRef.current!.value > 0) {
      props.onSubmit({
        nutrient_id: +selectRef.current!.value,
        value: +valueRef.current!.value,
        isDV: !scalarRef.current!.checked
      });
    } else {
      // TODO: show some error
    }
  }

  const onInputChange = (nutrient: Nutrient) => {
    setUnit(`${nutrient.unit.name.plural}`)
  }

  const onValueInputKey = (event: any) => {
    if(event.key === 'Enter' || event.key === 'Return') {
      event.preventDefault();
      onSubmit();
    }
  }

  const onAddButtonClick = (event: any) => {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className={form_classes}>
      <Select ref={selectRef} onChange={onInputChange} id='nutrient-value-nutrient-name'
        name='name' dataContext={NutrientDataContext} extractItem={extractNutrientItem} />
      <input className={input_classes + ' w-28'} ref={valueRef} onKeyPress={onValueInputKey} name='value' type='number'
        placeholder='Value' />
      <input ref={scalarRef} id='nutrient-value-input-scalar' name='value-type'
        value='scalar' type='radio' defaultChecked />
      <label htmlFor='nutrient-value-input-scalar'>{unit}</label>
      <input id='nutrient-value-input-dv' name='value-type' value='dv-pct' type='radio' />
      <label htmlFor='nutrient-value-input-dv'>DV%</label>
      <button className={button_classes} onClick={onAddButtonClick}>Add</button>
    </div>
  );
}

export default NutrientValueInputListItem;
