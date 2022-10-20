import { useEffect, useState } from 'react';
import { ContextDataBase, DataContextData }
  from '../store/DataContext';
import Id from "../types/Id";
import useDataContextData from './DataContextData';

/**
 * A hook that wraps the useDataContextData hook and provides a formatted
 * view of a DataContext's data.
 * 
 * @template T The context's data type.
 * @template U The context's submission type.
 * @template V The format type.
 * @param context The DataContext to use.
 * @param format A Function that takes the context's data and returns
 *               it as a list of the specified type.
 * @returns A state containing the formatted data.
 */
const useFormattedDataContextData = <T extends ContextDataBase, U, V>(
    context: React.Context<DataContextData<T, U>>,
    format: (data: Map<Id, T>) => V[]) => {
  const data = useDataContextData(context);
  const [formattedData, setFormattedData] = useState<V[]>(format(data));
  
  useEffect(() => {
    setFormattedData(format(data));
  }, [data]);
  
  return formattedData;
}

export default useFormattedDataContextData;
