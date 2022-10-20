import React from 'react';
import Intake from '../types/Intake';
import { CreateDataProvider, DataContextData,
  getDefaultContextData } from "./DataContext";
import NewIntake from '../types/new/NewIntake';

const default_data =
  getDefaultContextData<Intake, NewIntake>('intake', false);
const IntakeDataContext =
  React.createContext<DataContextData<Intake, NewIntake>>(
    default_data);
export const IntakeDataProvider =
  CreateDataProvider<Intake, NewIntake>(
    IntakeDataContext, default_data);

export default IntakeDataContext;
