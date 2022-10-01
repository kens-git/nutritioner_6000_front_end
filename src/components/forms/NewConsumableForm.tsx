import ConsumableCategoryDataContext from "../../store/ConsumableCategoryDataContext";
import NameDataContext from "../../store/NameDataContext";
import NutrientValueList from "../lists/NutrientValueList";
import Select, { extractNameItem, extractUnitItem, extractConsumableCategoryItem }
  from "../ui/Select";
import UnitDataContext from "../../store/UnitDataContext";

const NewConsumableForm: React.FC<{}> = (props) => {
  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log('submitted');
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor='new-consumable-name'>Name</label>
        <Select id='new-consumable-name' name='name' dataContext={NameDataContext}
          extractItem={extractNameItem} />
      </div>
      <div>
        <label htmlFor='new-consumable-category'>Category</label>
        <Select id='new-consumable-category' name='category'
          dataContext={ConsumableCategoryDataContext}
          extractItem={extractConsumableCategoryItem}/>
      </div>
      <div>
        <label htmlFor='new-consumable-unit'>Unit</label>
        <Select id='new-consumable-unit' name='unit' dataContext={UnitDataContext}
          extractItem={extractUnitItem} />
      </div>
      <div>
        <label htmlFor='new-consumable-reference-size'>Reference Size</label>
        <input id='new-unit-description' name='reference-size' type='number' />
      </div>
      <NutrientValueList title='' description=''/>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default NewConsumableForm;
