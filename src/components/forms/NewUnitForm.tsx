import Select from "../ui/Select";

const NewUnitForm: React.FC<{}> = (props) => {
  return (
    <form>
      <div>
        <label htmlFor='new-unit-name'>Name</label>
        <Select id='new-unit-name' name='name' />
      </div>
      <div>
        <label htmlFor='new-unit-description'>Description</label>
        <input id='new-unit-description' name='description' type='text' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default NewUnitForm;
