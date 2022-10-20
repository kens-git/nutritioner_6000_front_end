import { useContext, useRef, useState } from 'react';
import Nutrient from '../../types/Nutrient';
import NutrientDataContext from '../../store/NutrientDataContext';
import Select from '../ui/Select';
import { extractNutrientItem } from '../ui/SelectItem';
import { button_classes, form_classes, input_classes }
  from '../tailwind_classes';
import DailyValueDataContext from '../../store/DailyValueDataContext';
import { getLatest } from '../../utility/context_utilities';

/** Defines the data represented by a NutrientValueList item. */
export interface NutrientValueListItemData {

  /** The represented Nutrient. */
  nutrient: Nutrient;

  /** The amount of the represented Nutrient. */
  value: number;
}

/** Defines the props accepted by the NutrientValueInputListItem. */
interface NutrientValueInputListItemProps {

  /** Determines if the daily value percentage values can be input. */
  isDVShown: boolean;

  /**
   * Function to call when the list item is submitted.
   * @param data The submitted data.
  */
  onSubmit: (data: NutrientValueListItemData) => void;  
}

/** A component for inputting a nutrient and an associated amount. */
const NutrientValueInputListItem:
    React.FC<NutrientValueInputListItemProps> = (props) => {
  const valueRef = useRef<HTMLInputElement>(null);
  const scalarRef = useRef<HTMLInputElement>(null);
  const dailyValueCtx = useContext(DailyValueDataContext);
  const [inputError, setInputError] = useState<string>();
  const [unit, setUnit] = useState('');
  const [nutrient, setNutrient] = useState<Nutrient>();

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
          return value.nutrient.id === nutrient!.id;
        });
        if(!nutrientValue) {
          setInputError('No daily value set for given nutrient.');
          return;
        }
        value = value / 100 * nutrientValue.value;
      }
      setInputError(undefined);
      props.onSubmit({
        nutrient: nutrient!,
        value: value
      });
    } else {
      setInputError('Value must be greater than zero.')
    }
  }

  const onInputChange = (nutrient: Nutrient) => {
    setUnit(`${nutrient.unit.name.plural}`);
    setNutrient(nutrient);
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
      <Select onChange={onInputChange} id='nutrient-value-nutrient-name'
        name='name' dataContext={NutrientDataContext} extractItem={extractNutrientItem} />
      <input className={input_classes + ' w-28'} ref={valueRef} onKeyPress={onValueInputKey} name='value' type='number'
        placeholder={`Value (${nutrient ? nutrient!.unit.name.abbreviation : ''})`} />
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
