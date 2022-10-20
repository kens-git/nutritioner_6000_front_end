import { useContext, useRef, useState } from 'react';
import Nutrient from '../../types/Nutrient';
import NutrientDataContext from '../../store/NutrientDataContext';
import Select from '../ui/Select';
import { extractNutrientItem } from '../ui/SelectItem';
import { button_classes, form_classes, input_classes }
  from '../tailwind_classes';
import DailyValueDataContext from '../../store/DailyValueDataContext';
import { getLatest } from '../../utility/context_utilities';
import Id from '../../types/Id';

export interface NutrientValueListItemData {
  nutrient: Id;
  value: number;
}

interface NutrientValueInputListItemProps {
  isDVShown: boolean;
  onSubmit: (data: NutrientValueListItemData) => void;
}

const NutrientValueInputListItem:
    React.FC<NutrientValueInputListItemProps> = (props) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const scalarRef = useRef<HTMLInputElement>(null);
  const dailyValueCtx = useContext(DailyValueDataContext);
  const [inputError, setInputError] = useState<string>();
  const [unit, setUnit] = useState('');
  const [nutrientId, setNutrientId] = useState<Id>();

  const onSubmit = () => {
    if(valueRef.current!.value && +valueRef.current!.value > 0) {
      let value = +valueRef.current!.value;
      if(scalarRef.current && !scalarRef.current!.checked) {
        if(!dailyValueCtx.isLoaded) {
          setInputError('Daily values are currently not loaded.');
          return;
        }
        const dailyValue = getLatest(dailyValueCtx.data);
        if(!dailyValue) {
          setInputError('No daily values set.');
          return;
        }
        const nutrientValue = dailyValue.nutrients.find(value => {
          return value.nutrient.id === nutrientId;
        });
        if(!nutrientValue) {
          setInputError('No daily value set for given nutrient.');
          return;
        }
        value = value / 100 * nutrientValue.value;
      }
      setInputError(undefined);
      props.onSubmit({
        nutrient: +selectRef.current!.value,
        value: value
      });
    } else {
      setInputError('Value must be greater than zero.')
    }
  }

  const onInputChange = (nutrient: Nutrient) => {
    setUnit(`${nutrient.unit.name.plural}`);
    setNutrientId(nutrient.id);
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
      {inputError && <p>{inputError}</p>}
      <Select ref={selectRef} onChange={onInputChange} id='nutrient-value-nutrient-name'
        name='name' dataContext={NutrientDataContext} extractItem={extractNutrientItem} />
      <input className={input_classes + ' w-28'} ref={valueRef} onKeyPress={onValueInputKey} name='value' type='number'
        placeholder='Value' />
      {props.isDVShown &&
        <>
          <input ref={scalarRef} id='nutrient-value-input-scalar' name='value-type'
            value='scalar' type='radio' defaultChecked />
          <label htmlFor='nutrient-value-input-scalar'>{unit}</label>
          <input id='nutrient-value-input-dv' name='value-type' value='dv-pct' type='radio' />
          <label htmlFor='nutrient-value-input-dv'>DV%</label>
        </>
      }
      <button className={button_classes} onClick={onAddButtonClick}>Add</button>
    </div>
  );
}

export default NutrientValueInputListItem;
