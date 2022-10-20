import ConsumableNutrient from '../ConsumableNutrient';

interface NewTarget {
  timestamp: string;
  name: string;
  description: string;
  nutrients: ConsumableNutrient[];
}

export default NewTarget;
