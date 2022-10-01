import React from 'react';
import Name from '../types/Name';
import { CreateDataProvider, DataContextData, getDefaultContextData } from "./DataContext";

const default_data = getDefaultContextData<Name>();
const NameDataContext =
  React.createContext<DataContextData<Name>>(default_data);
export const NameDataProvider =
  CreateDataProvider<Name>(NameDataContext, default_data, 'name');

export default NameDataContext;

// import React, { useContext, useEffect, useState } from "react";
// import NameSelectModel from "../models/select/NameSelectModel";
// import Name from "../types/Name";
// import { GET } from "../utility/Requests";
// import AuthContext from "./AuthContext";

// type FilterFunction = (name: Name) => any;

// export interface NameContextData {
//   isLoaded: boolean;
//   names: Name[];
//   add: (name: Name) => void; // TODO: return some value
//   filter: (f: FilterFunction) => any[];
// }

// const NameContext = React.createContext<NameContextData>({
//   isLoaded: false,
//   names: [],
//   add: (name: Name) => {},
//   filter: () => { return [] }
// });

// export const NameContextProvider:
//     React.FC<{children: React.ReactNode}> = (props) => {
//   const applyFilter = (filter: FilterFunction) => {
//     return contextValue.names.map(filter);
//   }

//   const addName = (name: Name) => {
//     const names = data.names.push(name)
//     setData({
//       isLoaded: data.isLoaded,
//       names: [...data.names, name],
//       add: data.add,
//       filter: applyFilter
//     })
//   }

//   const [data, setData] = useState<NameContextData>({
//     isLoaded: false,
//     names: [],
//     add: (name: Name) => {},
//     filter: applyFilter
//   });
//   const authCtx = useContext(AuthContext);
  
//   const contextValue: NameContextData = {
//     isLoaded: false,
//     names: [],
//     add: (name: Name) => {},
//     filter: applyFilter
//   }

//   useEffect(() => {
//     GET<Name[]>('name', authCtx.token!)
//     .then((response) => {
//       setData({
//         isLoaded: true,
//         names: response!.data,
//         add: addName,
//         filter: applyFilter
//       });
//     });
//   });

//   return (
//     <NameContext.Provider value={contextValue}>
//       {props.children}
//     </NameContext.Provider>
//   );
// }

// export default NameContext;
