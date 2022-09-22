import NewConsumableCategoryForm from "../components/forms/NewConsumableCategoryForm";
import NewConsumableForm from "../components/forms/NewConsumableForm";
import NewNameForm from "../components/forms/NewNameForm";
import NewNutrientForm from "../components/forms/NewNutrientForm";
import NewUnitForm from "../components/forms/NewUnitForm";

const AddPage: React.FC<{}> = (props) => {
  return (
    <>
      <h1>Add New Consumable</h1>
      <NewConsumableForm />
      <h1>Add New Nutrient</h1>
      <NewNutrientForm />
      <h1>Add Name Name</h1>
      <NewNameForm />
      <h1>Add New Unit</h1>
      <NewUnitForm />
      <h1>Add New Consumable Category</h1>
      <NewConsumableCategoryForm />
    </>
  );
}

export default AddPage;
