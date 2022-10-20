import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from './AuthContext';
import { GET, POST } from '../utility/Requests';
import Id from '../types/Id';

export interface ContextDataBase {
  id: Id;
}

export interface DataContextData<T extends ContextDataBase, U> {
  path: string;
  isLoaded: boolean;
  isPreloaded: boolean;
  data: Map<number, T>;
  add: (value: U) => Promise<Id>;
  fetch: (params: any) => Promise<T[]>;
}

export const getDefaultContextData =
    <T extends ContextDataBase, U>(path: string, isPreloaded: boolean):
      DataContextData<T, U> => {
  return {
    path: path,
    isLoaded: false,
    isPreloaded: isPreloaded,
    data: new Map<number, T>(),
    add: () => { return new Promise(() => {}); },
    fetch: (params: any) => {
      return new Promise<T[]>(resolve => { resolve([]); }); }
  }
}

export const CreateDataProvider = <T extends ContextDataBase, U>(
    context: React.Context<DataContextData<T, U>>,
    defaultData: DataContextData<T, U>)
    : React.FC<{children: React.ReactNode}> => {
  return (props) => {
    const authCtx = useContext(AuthContext);
    const [data, setData] = useState<DataContextData<T, U>>(defaultData);
    const callbackList = useRef<Array<(data: Map<Id, T>) => void>>([]);

    const add = (value: U) => {
      return POST<U, T>(data!.path,
          { ...value, user: +authCtx.user_id! },
          authCtx.token!)
      .then(response => {
        // TODO: Potentially format server response to avoid this extra request.
        return GET<T>(data!.path + '/' + response!.data.id.toString(), authCtx.token!)
        .then(response => {
          const id = response!.data.id;
          setData({
            ...data!,
            data: new Map(data!.data.set(id, response!.data))
          });
          return id;
        });
      });
    }

    const fetch = (params: any) => {
      return GET<T[]>(data!.path, authCtx.token!, params)
      .then((response) => {
        return response!.data;
      });
    }

    const contextData: DataContextData<T, U> = {
      path: data!.path,
      isLoaded: data!.isLoaded,
      isPreloaded: data!.isPreloaded,
      data: data!.data,
      add: add,
      fetch: fetch
    }

    useEffect(() => {
      if(data!.isPreloaded) {
        GET<T[]>(data!.path, authCtx.token!)
        .then((response) => {
          const loadedData = new Map(response!.data.map(item => [item.id, item]));
          setData({
            ...data!,
            isLoaded: true,
            data: loadedData
          });
          callbackList.current.forEach(callback => { callback(loadedData); });
        });
      }
    }, []);

    return (
      <context.Provider value={contextData}>
        {props.children}
      </context.Provider>
    );
  }
}
