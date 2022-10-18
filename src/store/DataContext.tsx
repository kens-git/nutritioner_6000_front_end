import { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { GET, POST } from '../utility/Requests';
import Id from '../types/Id';

interface ContextDataBase {
  id: Id;
}

// Takes a type T and returns subtype U
type ExtractSubtype<T, U> = (value: T) => U;

export interface DataContextData<T extends ContextDataBase, U> {
  path: string;
  isLoaded: boolean;
  data: Map<number, T>;
  add: (value: U) => Promise<Id>;
  fetch: (params: any) => Promise<T[]>;
  extract: ExtractSubtype<T, U>;
}

export const getDefaultContextData =
    <T extends ContextDataBase, U>(path: string, extract: ExtractSubtype<T, U>):
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

    const add = (value: U) => {
      return POST<U, T>(data.path,
          { ...value, user: +authCtx.user_id! },
          authCtx.token!)
      .then(response => {
        // TODO: format server response to avoid this extra request.
        return GET<T>(data.path + '/' + response!.data.id.toString(), authCtx.token!)
        .then(response => {
          const id = response!.data.id;
          setData({
            ...data,
            data: new Map(data.data.set(id, response!.data))
          });
          return id;
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
