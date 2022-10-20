import { Context, useContext, useEffect, useState } from 'react';
import SelectItem from './SelectItem';

/** Defines the props accepted by the Select component. */
interface SelectProps {

  /** The id of the underlying select element. */
  id?: string;

  /** The name of the underlying select element. */
  name?: string;

  /** The CSS styles applied to the component. */
  className?: string;

  /** The DataContext that provides data to the component. */
  dataContext: Context<any>;

  /**
   * Function to convert DataContext data to SelectItems.
   * 
   * @param value Single instance to convert to a SelectItem.
   * @returns A SelectItem.
   */
  extractItem: (value: any) => SelectItem;

  /**
   * Function called when the current selection changes.
   *
   * @param value The selected value. 
   */
  onChange: (value: any) => void;
}

const select_classes = 'p-1.5 border border-gray-300 focus:border-sky-300 hover:border-sky-300';

/** Component for displaying a select element containing arbitrary data types. */
const Select: React.FC<SelectProps> = (props) => {
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
          onChange={onChange} id={props.id} name={props.name}>
        {formattedData.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
    );
  }
  return <p>No values to select.</p>
};

export default Select;
