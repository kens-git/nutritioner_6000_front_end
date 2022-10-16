import { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { GET, POST } from '../utility/Requests';

type ID = number;

interface ContextDataBase {
  id: ID;
}

// Takes a type T and returns subtype U
type Subtype<T, U> = (value: T) => U;

export interface DataContextData<T extends ContextDataBase, U> {
  path: string;
  isLoaded: boolean;
  data: Map<number, T>;
  add: (value: T) => Promise<void>;
  fetch: (params: any) => Promise<T[]>;
  extract: Subtype<T, U>;
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
    extract: extract
  }
}

export const CreateDataProvider = <T extends ContextDataBase, U>(
    context: React.Context<DataContextData<T, U>>,
    defaultValue: DataContextData<T, U>)
    : React.FC<{children: React.ReactNode}> => {
  return (props) => {
    const authCtx = useContext(AuthContext);
    const [data, setData] = useState<DataContextData<T, U>>(defaultValue);

    const add = (value: T) => {
      return POST<U, T>(data.path,
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
      extract: data.extract
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
