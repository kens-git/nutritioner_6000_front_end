import React from 'react';
import Intake from '../types/Intake';
import { CreateDataProvider, DataContextData,
  getDefaultContextData } from "./DataContext";

// TODO: move
export interface NewIntake {
  timestamp: Date,
  consumable: number,
  serving_size: number;
}

const default_data =
  getDefaultContextData<Intake, NewIntake>('intake', false);
const IntakeDataContext =
  React.createContext<DataContextData<Intake, NewIntake>>(
    default_data);
export const IntakeDataProvider =
  CreateDataProvider<Intake, NewIntake>(
    IntakeDataContext, default_data);

export default IntakeDataContext;
