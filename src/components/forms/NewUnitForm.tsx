import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import Select, { extractNameItem } from "../ui/Select";
import NameDataContext, { NameDataProvider } from "../../store/NameDataContext";

const NewUnitForm: React.FC<{}> = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <form>
      <div>
        <label htmlFor='new-unit-name'>Name</label>
          <Select id='new-unit-name' name='name'
            dataContext={NameDataContext} extractItem={extractNameItem} />
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
