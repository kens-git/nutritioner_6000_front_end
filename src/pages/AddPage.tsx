import Card from "../components/ui/Card";
import NewConsumableCategoryForm from "../components/forms/NewConsumableCategoryForm";
import NewConsumableForm from "../components/forms/NewConsumableForm";
import NewNameForm from "../components/forms/NewNameForm";
import NewNutrientForm from "../components/forms/NewNutrientForm";
import NewUnitForm from "../components/forms/NewUnitForm";
import SectionHeader from "../components/ui/SectionHeader";

const AddPage: React.FC<{}> = (props) => {
  return (
    <>
      <Card>
        <SectionHeader label='Add New Consumable' />
        <NewConsumableForm />
      </Card>
      <Card>
        <SectionHeader label='Add New Nutrient' />
        <NewNutrientForm />
      </Card>
      <Card>
        <SectionHeader label='Add New Name' />
        <NewNameForm />
      </Card>
      <Card>
        <SectionHeader label='Add New Unit' />
        <NewUnitForm />
      </Card>
      <Card>
        <SectionHeader label='Add New Consumable Category' />
        <NewConsumableCategoryForm />
      </Card>
    </>
  );
}

export default AddPage;
