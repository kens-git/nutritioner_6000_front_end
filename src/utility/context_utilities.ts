import Id from "../types/Id";
import { ContextDataBase } from '../store/DataContext';

export const getLatest = <T extends ContextDataBase>(
    dataMap: Map<Id, T>): T | undefined => {
  return dataMap.get(Math.max(...dataMap.keys()));
}
