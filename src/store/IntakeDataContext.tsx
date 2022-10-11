import React from 'react';
import Intake from '../types/Intake';
import { CreateDataProvider, DataContextData,
  getDefaultContextData } from "./DataContext";

export interface NewIntake {
  timestamp: Date,
  consumable: number,
  serving_size: number;
}

const extractNewIntake =
    (intake: Intake): NewIntake => {
  return {
    timestamp: intake.timestamp,
    consumable: intake.consumable.id,
    serving_size: intake.serving_size
  }
}

const default_data =
  getDefaultContextData<Intake, NewIntake>(
    'intake', extractNewIntake);
const IntakeDataContext =
  React.createContext<DataContextData<Intake, NewIntake>>(
    default_data);
export const IntakeDataProvider =
  CreateDataProvider<Intake, NewIntake>(
    IntakeDataContext, default_data);

export default IntakeDataContext;
