import Id from "../types/Id";
import { ContextDataBase } from '../store/DataContext';

/**
 * Gets the latest value from a DataContext's data.
 * 
 * @param dataMap The DataContext's data.
 * @returns The value with the highest Id, or invalid if dataMap is empty.
 */
export const getLatest = <T extends ContextDataBase>(
    dataMap: Map<Id, T>): T | undefined => {
  return dataMap.get(Math.max(...dataMap.keys()));
}
