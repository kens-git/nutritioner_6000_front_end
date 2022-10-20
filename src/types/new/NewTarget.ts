import NewConsumableNutrient from './NewConsumableNutrient';

interface NewTarget {
  // ISO string
  timestamp: string;
  name: string;
  description: string;
  nutrients: NewConsumableNutrient[];
}

export default NewTarget;
