import { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { GET, POST } from '../utility/Requests';

type ID = number;

interface ContextDataBase {
  id: ID;
}

// Takes a type T and returns subtype U
type Subtype<T, U> = (value: T) => U;

type Filter<T> = (value: T) => any;

export interface DataContextData<T extends ContextDataBase, U> {
  path: string;
  isLoaded: boolean;
  data: Map<number, T>; // TODO: allows mutating in place, add a getter instead
  add: (value: T) => Promise<void>; // TODO: return type
  fetch: (params: any) => Promise<T[]>;
  extract: Subtype<T, U>;
  filter: (f: Filter<T>) => any[];
}

export const getDefaultContextData =
    <T extends ContextDataBase, U>(path: string, extract: Subtype<T, U>):
      DataContextData<T, U> => {
  return {
    path: path,
    isLoaded: false,
    data: new Map<number, T>(),
    add: () => { return new Promise(() => {}); },
    fetch: (params: any) => {
      return new Promise<T[]>(resolve => { resolve([]); }); },
    extract: extract,
    filter: () => []
  }
}

// TODO: the DataContextData 'path' property makes this 'path' parameter redundant
//        see above TODO about the provider state interface
export const CreateDataProvider = <T extends ContextDataBase, U>(
    context: React.Context<DataContextData<T, U>>,
    defaultValue: DataContextData<T, U>)
    : React.FC<{children: React.ReactNode}> => {
  return (props) => {
    const authCtx = useContext(AuthContext);
    const [data, setData] = useState<DataContextData<T, U>>(defaultValue);

    const applyFilter = (filter: Filter<T>) => {
      return Array.from(contextData.data.values()).map(filter);
    }

    const add = async (value: T) => {
      await POST<U, T>(data.path,
          { ...data.extract(value), user: +authCtx.user_id! },
          authCtx.token!)
      .then(response => {
        value.id = response!.data.id;
        setData({
          ...data,
          data: new Map(data.data.set(value.id, value))
        });
      });
    }

    const get = (id: number) => {
      return data.data.get(id);
    }

    const fetch = (params: any) => {
      return GET<T[]>(data.path, authCtx.token!, params)
      .then((response) => {
        return response!.data;
      });
    }

    const contextData: DataContextData<T, U> = {
      path: data.path,
      isLoaded: data.isLoaded,
      data: data.data,
      add: add,
      fetch: fetch,
      extract: data.extract,
      filter: applyFilter
    }

    // TODO: don't do for intakes
    useEffect(() => {
      GET<T[]>(data.path, authCtx.token!)
      .then((response) => {
        setData({
          ...data,
          isLoaded: true,
          data: new Map(response!.data.map(item => [item.id, item]))
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
