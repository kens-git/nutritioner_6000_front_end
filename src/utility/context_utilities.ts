import Id from "../types/Id";
import { ContextDataBase } from '../store/DataContext';

export const getLatest = <T extends ContextDataBase>(
    dataMap: Map<Id, T>): T | undefined => {
  if(dataMap.size === 0) {
    return undefined;
  }
  // TODO: If Math.max(...) returns an invalid value (i.e., when dataMap is empty),
  //        then remove the above statement if possible.
  return dataMap.get(Math.max(...dataMap.keys()));
}
