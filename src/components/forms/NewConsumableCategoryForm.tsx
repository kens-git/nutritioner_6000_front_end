import Select, { extractNameItem } from "../ui/Select";
import NameDataContext from '../../store/NameDataContext';

const NewConsumableCategoryForm: React.FC<{}> = (props) => {
  return (
    <form>
      <div>
        <label htmlFor='new-consumable-category-name'>Name</label>
        <Select id='new-consumable-category-name' name='name' dataContext={NameDataContext}
          extractItem={extractNameItem}/>
      </div>
      <div>
        <label htmlFor='new-consumable-category-description'>Description</label>
        <input id='new-consumable-category-description' name='description' type='text' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default NewConsumableCategoryForm;
