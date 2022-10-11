import { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { GET, POST } from '../utility/Requests';

interface ID {
  id: number;
}

// Takes a type T and returns type U
type Extract<T, U> = (value: T) => U;

type Filter<T> = (value: T) => any;

export interface DataContextData<T extends ID, U> {
  path: string;
  isLoaded: boolean;
  data: T[]; // TODO: allows mutating in place, add a getter instead
  add: (value: T) => Promise<void>; // TODO: return type
  get: (id: number) => T | undefined; // TODO: only used by list, maybe remove
  get_params: (params: any) => Promise<T[]>;
  extract: Extract<T, U>;
  filter: (f: Filter<T>) => any[];
}

export const getDefaultContextData =
    <T extends ID, U>(path: string, extract: Extract<T, U>):
      DataContextData<T, U> => {
  return {
    path: path,
    isLoaded: false,
    data: [],
    add: () => { return new Promise(() => {}); },
    get: (id: number) => undefined,
    get_params: (params: any) => {
      return new Promise<T[]>(resolve => { resolve([]); }); },
    extract: extract,
    filter: () => []
  }
}

// TODO: the DataContextData 'path' property makes this 'path' parameter redundant
//        see above TODO about the provider state interface
export const CreateDataProvider = <T extends ID, U>(
    context: React.Context<DataContextData<T, U>>,
    defaultValue: DataContextData<T, U>)
    : React.FC<{children: React.ReactNode}> => {
  return (props) => {
    const authCtx = useContext(AuthContext);
    const [data, setData] = useState<DataContextData<T, U>>(defaultValue);

    const applyFilter = (filter: Filter<T>) => {
      return contextData.data.map(filter);
    }

    const add = async (value: T) => {
      //console.log(value);
      await POST<U, U[]>(data.path,
          { ...data.extract(value), user: +authCtx.user_id! },
          authCtx.token!)
      .then(response => {
        setData({
          ...data,
          // TODO: The back end may assign an ID to the created
          //       value, so this simple assignment doesn't
          //       work because value is using a null/invalid
          //       value for its ID as given by the front end.
          //       Potentially add a method opposite to extract
          //       to take the submitted value, the value
          //       returned from the back end, and combine
          //       them into the final representation that
          //       gets stored here.
          data: [...data.data, value]
        });
      });
    }

    const get = (id: number) => {
      return data.data.find(item => item.id === id);
    }

    const get_params = (params: any) => {
      return GET<T[]>(data.path, authCtx.token!, params)
      .then((response) => {
        return response!.data
      });
    }

    const contextData: DataContextData<T, U> = {
      path: data.path,
      isLoaded: data.isLoaded,
      data: data.data,
      add: add,
      get: get,
      get_params: get_params,
      extract: data.extract,
      filter: applyFilter
    }

    useEffect(() => {
      //const getData = async () => {
        // TODO: what guarantee is there that the token exists when this is run?
        /* await */ GET<T[]>(data.path, authCtx.token!)
        .then((response) => {
          setData({
            ...data,
            isLoaded: true,
            data: response!.data
          });
        });
      //}

      //getData();
    }, []);

    return (
      <context.Provider value={contextData}>
        {props.children}
      </context.Provider>
    );
  }
}
