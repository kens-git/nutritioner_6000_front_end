import { Context, forwardRef, useContext, useEffect } from 'react';
import Consumable from '../../types/Consumable';
import ConsumableCategory from '../../types/ConsumableCategory';
import Name from '../../types/Name';
import Nutrient from '../../types/Nutrient';
import Unit from '../../types/Unit';

export interface SelectItem {
  id: string;
  label: string;
}

export const extractConsumableItem =
    (consumable: Consumable): SelectItem => {
  return {
    id: consumable.id.toString(),
    label: consumable.name
  }
}

export const extractConsumableCategoryItem =
    (category: ConsumableCategory): SelectItem => {
  return {
    id: category.id.toString(),
    label: category.name.name
  }
}

export const extractNameItem = (name: Name): SelectItem => {
  return {
    id: name.id.toString(),
    label: name.name
  }
};

export const extractNutrientItem = (nutrient: Nutrient): SelectItem => {
  return {
    id: nutrient.id.toString(),
    label: nutrient.name.name
  }
}

export const extractUnitItem = (unit: Unit): SelectItem => {
  return {
    id: unit.id.toString(),
    label: unit.name.name
  }
};

interface SelectProps {
  id?: string;
  name?: string;
  className?: string;
  dataContext: Context<any>;
  extractItem: (value: any) => any;
  onChange?: (value: any) => void // TODO: parameter type
}

const select_classes = 'p-1.5 border border-gray-300 focus:border-sky-300 hover:border-sky-300';

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, selectRef) => {
  const dataCtx = useContext(props.dataContext);
  const data: any[] = Array.from(dataCtx.data.values());
  const formattedData: SelectItem[] = dataCtx.filter(props.extractItem);
  const classes = props.className ? props.className! : '';

  const onChange = (event: any) => {
    if(props.onChange) {
      props.onChange(data[event.target.options.selectedIndex]);
    }
  }

  useEffect(() => {
    if(data.length > 0 && props.onChange) {
      props.onChange(data[0]);
    }
  }, []);

  if(data.length > 0) {
    return (
      // TODO: don't use onChange if it's not defined: look into spread operator for props
      <select className={classes + ' ' + select_classes}
          onChange={onChange} ref={selectRef} id={props.id} name={props.name}>
        {formattedData.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
    );
  }
  return <p>No values to select.</p>
});

export default Select;
