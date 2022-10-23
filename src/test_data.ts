import { DataContextData } from "./store/DataContext";
import Consumable from "./types/Consumable";
import ConsumableCategory from "./types/ConsumableCategory";
import ConsumableNutrient from "./types/ConsumableNutrient";
import DailyValue from './types/DailyValue';
import Id from "./types/Id";
import Intake from "./types/Intake";
import Name from "./types/Name";
import NewDailyValue from "./types/new/NewDailyValue";
import NewIntake from "./types/new/NewIntake";
import NewNutrient from "./types/new/NewNutrient";
import NewTarget from "./types/new/NewTarget";
import Nutrient from "./types/Nutrient";
import Target from "./types/Target";
import Unit from "./types/Unit";

export const Name1: Name = {
  id: 1,
  name: 'Name1',
  abbreviation: 'n1',
  plural: 'Name1s'
};

export const Name2: Name = {
  id: 2,
  name: 'Name2',
  abbreviation: 'n2',
  plural: 'Name2s'
};

export const Name3: Name = {
  id: 3,
  name: 'Name3',
  abbreviation: 'n3',
  plural: 'Name3s'
};

export const Category1: ConsumableCategory = {
  id: 1,
  name: Name1,
  description: ''
};

export const Category2: ConsumableCategory = {
  id: 2,
  name: Name2,
  description: ''
};

export const Unit1: Unit = {
  id: 1,
  name: Name1,
  description: ''
};

export const Unit2: Unit = {
  id: 2,
  name: Name2,
  description: ''
};

export const Nutrient1: Nutrient = {
  id: 1,
  name: Name1,
  description: '',
  unit: Unit1,
  is_macronutrient: true
};

export const Nutrient2: Nutrient = {
  id: 2,
  name: Name2,
  description: '',
  unit: Unit1,
  is_macronutrient: false
};

export const Nutrient3: Nutrient = {
  id: 3,
  name: Name3,
  description: '',
  unit: Unit2,
  is_macronutrient: false
};

export const ConsumableNutrient1: ConsumableNutrient = {
  id: 1,
  nutrient: Nutrient1,
  value: 100
};

export const ConsumableNutrient2: ConsumableNutrient = {
  id: 2,
  nutrient: Nutrient2,
  value: 200
};

export const ConsumableNutrient3: ConsumableNutrient = {
  id: 3,
  nutrient: Nutrient3,
  value: 300
};

export const Consumable1: Consumable = {
  id: 1,
  name: 'Consumable1',
  category: Category1,
  unit: Unit1,
  reference_size: 100,
  nutrients: [
    ConsumableNutrient1,
    ConsumableNutrient2
  ]
};

export const Consumable2: Consumable = {
  id: 2,
  name: 'Consumable2',
  category: Category2,
  unit: Unit2,
  reference_size: 200,
  nutrients: [
    ConsumableNutrient1,
    ConsumableNutrient3
  ]
};

export const Consumable3: Consumable = {
  id: 3,
  name: 'Consumable3',
  category: Category2,
  unit: Unit2,
  reference_size: 1,
  nutrients: [
    ConsumableNutrient1,
    ConsumableNutrient3
  ]
};

export const DailyValue1: DailyValue = {
  id: 1,
  nutrients: [
    ConsumableNutrient1,
    ConsumableNutrient2,
    ConsumableNutrient3
  ]
}

export const Intake1: Intake = {
  id: 1,
  timestamp: new Date(2022, 1, 1, 0, 0, 0, 0),
  consumable: Consumable1,
  serving_size: 1
}

export const Intake2: Intake = {
  id: 1,
  timestamp: new Date(2022, 1, 1, 0, 0, 0, 0),
  consumable: Consumable2,
  serving_size: 10
}

export const Target1: Target = {
  id: 1,
  timestamp: new Date(2022, 1, 1, 0, 0, 0, 0),
  name: Name1,
  description: '',
  nutrients: [
    ConsumableNutrient1,
    ConsumableNutrient2
  ]
}

export const getTestTargetContextData =
  (): DataContextData<Target, NewTarget> => {
    return{
      path: 'null',
      isLoaded: true,
      isPreloaded: true,
      data: new Map<Id, Target>([Target1].map(
        value => [value.id, value])),
      add: (value: NewTarget) => { return new Promise(resolve => {}); },
      fetch: (query_params: any) => { return new Promise(resolve => {}); }
  }
}

export const getTestIntakeContextData =
  (): DataContextData<Intake, NewIntake> => {
    return {
      path: 'null',
      isLoaded: true,
      isPreloaded: true,
      data: new Map<Id, Intake>([Intake1, Intake2].map(
        intake => [intake.id, intake])),
      add: (intake: NewIntake) => { return new Promise(resolve => {}); },
      fetch: (query_params: any) => { return new Promise(resolve => {}); }
  }
}

export const getTestDailyValueContextData =
  (): DataContextData<DailyValue, NewDailyValue> => {
    return{
      path: 'null',
      isLoaded: true,
      isPreloaded: true,
      data: new Map<Id, DailyValue>([DailyValue1].map(
        value => [value.id, value])),
      add: (value: NewDailyValue) => { return new Promise(resolve => {}); },
      fetch: (query_params: any) => { return new Promise(resolve => {}); }
  }
}

export const getTestNutrientContextData =
  (): DataContextData<Nutrient, NewNutrient> => {
    return {
      path: 'null',
      isLoaded: true,
      isPreloaded: true,
      data: new Map<Id, Nutrient>([Nutrient1, Nutrient2, Nutrient3].map(
        nutrient => [nutrient.id, nutrient])),
      add: (nutrient: NewNutrient) => { return new Promise(resolve => {}); },
      fetch: (query_params: any) => { return new Promise(resolve => {}); }
  }
}
