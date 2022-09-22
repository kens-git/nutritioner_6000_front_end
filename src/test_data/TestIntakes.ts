import Intake from "../models/Intake";
import { CONSUMABLE_APPLE, CONSUMABLE_BACON, CONSUMABLE_BANANA,
  CONSUMABLE_MILK, CONSUMABLE_STEAK } from "./TestConsumables";

export const INTAKE_APPLE: Intake = {
  id: 1,
  timestamp: new Date(Date.now()),
  consumable: CONSUMABLE_APPLE,
  serving_size: 100
}

export const INTAKE_BACON: Intake = {
  id: 2,
  timestamp: new Date(Date.now()),
  consumable: CONSUMABLE_BACON,
  serving_size: 100
}

export const INTAKE_BANANA: Intake = {
  id: 3,
  timestamp: new Date(Date.now()),
  consumable: CONSUMABLE_BANANA,
  serving_size: 100
}

export const INTAKE_MILK: Intake = {
  id: 4,
  timestamp: new Date(Date.now()),
  consumable: CONSUMABLE_MILK,
  serving_size: 100
}

export const INTAKE_STEAK: Intake = {
  id: 5,
  timestamp: new Date(Date.now()),
  consumable: CONSUMABLE_STEAK,
  serving_size: 100
}
