import Select from "../ui/Select";

const NewConsumableCategoryForm: React.FC<{}> = (props) => {
  return (
    <form>
      <div>
        <label htmlFor='new-consumable-category-name'>Name</label>
        <Select id='new-consumable-category-name' name='name' />
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
