import { Context, forwardRef, useContext, useEffect, useState } from 'react';
import SelectItem from './SelectItem';

interface SelectProps {
  id?: string;
  name?: string;
  className?: string;
  dataContext: Context<any>;
  extractItem: (value: any) => any;
  onChange: (value: any) => void;
}

const select_classes = 'p-1.5 border border-gray-300 focus:border-sky-300 hover:border-sky-300';

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, selectRef) => {
  const dataCtx = useContext(props.dataContext);
  const data: any[] = Array.from(dataCtx.data.values());
  const formattedData: SelectItem[] = data.map(item => { return props.extractItem(item); });
  const [isIndexSet, setIsIndexSet] = useState<boolean>(false);
  const classes = props.className ? props.className! : '';

  const onChange = (event: any) => {
    props.onChange(data[event.target.options.selectedIndex]);
  }

  useEffect(() => {
    if(!isIndexSet && data.length > 0) {
      setIsIndexSet(true);
      props.onChange(data[0]);
    }
  });

  if(data.length > 0) {
    return (
      <select className={classes + ' ' + select_classes}
          onChange={onChange} ref={selectRef} id={props.id} name={props.name}>
        {formattedData.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
    );
  }
  return <p>No values to select.</p>
});

export default Select;
