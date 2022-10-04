import { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { GET } from '../utility/Requests';

interface ID {
  id: number;
}

type FilterFunction<T extends ID> = (value: T) => any;

export interface DataContextData<T extends ID> {
  path: string;
  isLoaded: boolean;
  data: T[];
  add: (value: T) => void; // TODO: return meaningful value
  get: (id: number) => T | undefined;
  filter: (f: FilterFunction<T>) => any[];
}

export const getDefaultContextData = <T extends ID>(): DataContextData<T> => {
  return {
    path: '',
    isLoaded: false,
    data: [],
    add: () => {},
    get: (id: number) => undefined,
    filter: () => []
  }
}

export interface DataProviderState<T> {
  isLoaded: boolean;
  data: T[]
}

export const CreateDataProvider = <T extends ID>(context: React.Context<DataContextData<T>>,
    defaultValue: DataContextData<T>, path: string)
    : React.FC<{children: React.ReactNode}> => {
  return (props) => {
    const authCtx = useContext(AuthContext);
    const [data, setData] = useState<DataProviderState<T>>(defaultValue);

    const applyFilter = (filter: FilterFunction<T>) => {
      return contextData.data.map(filter);
    }

    const add = (value: T) => {
      setData({
        isLoaded: data.isLoaded, // TODO: only update data
        data: [...data.data, value]
        // path: data.path,
        // isLoaded: data.isLoaded,
        // data: [...data.data, value],
        // add: data.add,
        // filter: applyFilter
      })
    }

    const get = (id: number) => {
      return data.data.find(item => item.id === id);
    }

    const contextData: DataContextData<T> = {
      path: path,
      isLoaded: data.isLoaded,
      data: data.data,
      add: add,
      get: get,
      filter: applyFilter
    }

    useEffect(() => {
      GET<T[]>(path, authCtx.token!)
      .then((response) => {
        setData({
          isLoaded: true,
          data: response!.data
          // path: data.path,
          // isLoaded: true,
          // data: response!.data,
          // add: data.add,
          // filter: data.filter
        });
      });
    }, []);

    return (
      <context.Provider value={contextData}>
        {props.children}
      </context.Provider>
    );
  }
}
