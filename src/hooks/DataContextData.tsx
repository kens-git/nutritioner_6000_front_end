import { useContext, useEffect, useState } from 'react';
import { ContextDataBase, DataContextData }
  from '../store/DataContext';
import Id from "../types/Id";

const useDataContextData =
    <T extends ContextDataBase, U>(context: React.Context<
      DataContextData<T, U>>) => {
  const dataCtx = useContext(context);
  const [data, setData] = useState<Map<Id, T>>(new Map<Id, T>());
  
  const onLoad = (data: Map<Id, T>) => {
    setData(data);
  }
  
  useEffect(() => {
    setData(dataCtx.data);
  }, [dataCtx.data]);
  
  return data;
}

export default useDataContextData;
