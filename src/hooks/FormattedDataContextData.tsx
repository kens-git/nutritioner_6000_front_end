import { useEffect, useState } from 'react';
import { ContextDataBase, DataContextData }
  from '../store/DataContext';
import Id from "../types/Id";
import useDataContextData from './DataContextData';

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
