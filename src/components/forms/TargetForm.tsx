import NutrientValueList from "../lists/NutrientValueList";

const DESCRIPTION = 'Targets define the desired daily intake for a particular nutrient.';

const TargetForm: React.FC<{}> = (props) => {
  return (
    <form>
      <NutrientValueList title='Targets' description={DESCRIPTION} />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default TargetForm;
