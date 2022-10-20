import { useContext, useEffect, useState } from 'react';
import { ContextDataBase, DataContextData }
  from '../store/DataContext';
import Id from "../types/Id";

/**
 * A hook to hide the details of a DataContext by providing
 * a single value that updates automatically.
 * 
 * @template T The context's data type.
 * @template U The context's submission type.
 * @param context The context to get data from.
 * @returns A state containing the DataContext's current data.
 */
const useDataContextData =
    <T extends ContextDataBase, U>(context: React.Context<
      DataContextData<T, U>>) => {
  const dataCtx = useContext(context);
  const [data, setData] = useState<Map<Id, T>>(new Map<Id, T>());
  
  useEffect(() => {
    setData(dataCtx.data);
  }, [dataCtx.data]);
  
  return data;
}

export default useDataContextData;
