import { useContext } from 'react';
import AuthContext from '../store/AuthContext';
import NutrientValueList from "../components/lists/NutrientValueList";

// TODO: make global strings + check out localization
const TARGET_DESCRIPTION = 'Targets define the desired daily intake for a particular nutrient.';
const DAILY_VALUE_DESCRIPTION = `Daily values are reference values used to convert micronutrient \
percentage values to a value with a unit. For instance, if the daily value for Vitamin C is
500mg, and a consumable has 50% of the daily value of Vitamin C in a single serving then that \
serving has 250mg of Vitamin C. These values are used when inputting new consumables if the \
value for a particular nutrient is given as a percentage. The default values are based on \
Health Canada's document, Nutrition Labeling: Table of Daily Values.`;

const ProfilePage: React.FC<{}> = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <NutrientValueList description={TARGET_DESCRIPTION} />
      <NutrientValueList description={DAILY_VALUE_DESCRIPTION} />
    </div>
  );
}

export default ProfilePage;
