import Id from '../Id';

interface NewNutrient {
  name: Id;
  description: string;
  unit: Id;
  is_macronutrient: boolean;
}

export default NewNutrient;
