import { Context, forwardRef, useContext, useEffect, useState } from 'react';
import Consumable from '../../types/Consumable';
import ConsumableCategory from '../../types/ConsumableCategory';
import Name from '../../types/Name';
import Nutrient from '../../types/Nutrient';
import SelectItem from '../../types/SelectItem';
import Unit from '../../types/Unit';

export const extractConsumableItem = (consumable: Consumable) => {
  return {
    id: consumable.id,
    label: consumable.name
  }
}

export const extractConsumableCategoryItem = (category: ConsumableCategory) => {
  return {
    id: category.id,
    label: category.name.name
  }
}

export const extractNameItem = (name: Name) => {
  return {
    id: name.id.toString(),
    label: name.name
  }
};

export const extractNutrientItem = (nutrient: Nutrient) => {
  return {
    id: nutrient.id.toString(),
    label: nutrient.name.name
  }
}

export const extractUnitItem = (unit: Unit) => {
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

const select_classes = 'p-1.5 \
border border-gray-300 \
focus:border-sky-300 \
hover:border-sky-300';

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, selectRef) => {
  const dataCtx = useContext(props.dataContext);
  const [isIndexSet, setIsIndexSet] = useState<boolean>();

  const data: any[] = dataCtx.data;
  const formattedData: SelectItem[] = dataCtx.filter(props.extractItem);

  const onChange = (event: any) => {
    if(props.onChange) {
      props.onChange(data[event.target.options.selectedIndex]);
    }
  }

  const classes = props.className ? props.className! : '';

  if(data.length > 0) {
    if(!isIndexSet && props.onChange) {
      props.onChange(data[0]);
      setIsIndexSet(true);
    }
    return (
      // TODO: don't use onChange if it's not defined
      <select className={classes + ' ' + select_classes}
          onChange={onChange} ref={selectRef} id={props.id} name={props.name}>
        {formattedData.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
    );
  }
  return <p>No data to display (plz change tho)</p>
});

export default Select;
