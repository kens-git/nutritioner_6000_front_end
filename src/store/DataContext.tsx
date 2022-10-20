import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from './AuthContext';
import { GET, POST } from '../utility/Requests';
import Id from '../types/Id';

/** Defines the base type that a DataContext's data type extends. */
export interface ContextDataBase {

  /** The id of the value, as assigned by the back end. */
  id: Id;
}

/** Defines the data type used by a DataContext. */
export interface DataContextData<T extends ContextDataBase, U> {

  /** The path to the API endpoint. */
  path: string;

  /** The loaded state of the context's data cache. */
  isLoaded: boolean;

  /**
   * Determines if the DataContext will load all data from the
   * endpoint on its initial render.
   */
  isPreloaded: boolean;

  /** The current data cache. */
  data: Map<number, T>;

  /**
   * Submits a value to the endpoint using a POST request.
   * Created values are then added to the data cache.
   * 
   * @param value The value to submit.
   * @returns The id of the created value.
   */
  add: (value: U) => Promise<Id>;

  /**
   * Submits a GET request to the endpoint with query parameters.
   * Doesn't add the response data to the data cache.
   * 
   * @param query_params The query parameters to send with the request.
   * @returns The queried data.
   */
  fetch: (query_params: any) => Promise<T[]>;
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
    fetch: (query_params: any) => {
      return new Promise<T[]>(resolve => { resolve([]); }); }
  }
}

/**
 * Function that returns a provider for the given DataContext.
 * 
 * @param context The context to create a provider for.
 * @param defaultData The initial context data.
 * @returns A provider for the context.
 */
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

    const fetch = (query_params: any) => {
      return GET<T[]>(data!.path, authCtx.token!, query_params)
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
