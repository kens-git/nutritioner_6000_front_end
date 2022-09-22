import Select from "../ui/Select";

const InputIntakeForm: React.FC<{}> = (props) => {
  return (
    <form>
      <Select name='name' />
      <input type='datetime-local' value='2022-01-01 9:30 PM' />
      <input type='number' placeholder='Serving Size' />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default InputIntakeForm;
