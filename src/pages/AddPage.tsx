import NewConsumableCategoryForm from "../components/forms/NewConsumableCategoryForm";
import NewConsumableForm from "../components/forms/NewConsumableForm";
import NewNameForm from "../components/forms/NewNameForm";
import NewNutrientForm from "../components/forms/NewNutrientForm";
import NewUnitForm from "../components/forms/NewUnitForm";
import SectionHeader from "../components/ui/SectionHeader";

const AddPage: React.FC<{}> = (props) => {
  return (
    <>
      <SectionHeader label='Add New Consumable' />
      <NewConsumableForm />
      <SectionHeader label='Add New Nutrient' />
      <NewNutrientForm />
      <SectionHeader label='Add New Name' />
      <NewNameForm />
      <SectionHeader label='Add New Unit' />
      <NewUnitForm />
      <SectionHeader label='Add New Consumable Category' />
      <NewConsumableCategoryForm />
    </>
  );
}

export default AddPage;
