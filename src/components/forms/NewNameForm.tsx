import React, { useContext, useRef } from "react";
import AuthContext from "../../store/AuthContext";
import NameContext from "../../store/NameDataContext";
import { POST } from '../../utility/Requests';

interface NameSubmit {
  user: number,
  name: string,
  abbreviation: string,
  plural: string;
}

const NewNameForm: React.FC<{}> = (props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const abbrRef = useRef<HTMLInputElement>(null);
  const pluralRef = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);
  const nameDataCtx = useContext(NameContext);

  const onSubmit = (event: any) => {
    event.preventDefault();
    nameDataCtx.add({
      id: -1,
      name: nameRef.current!.value,
      abbreviation: abbrRef.current!.value,
      plural: pluralRef.current!.value
    });
    // POST<NameSubmit, any>('name', {
    //   user: +(authCtx.user_id!),
    //   name: nameRef.current!.value,
    //   abbreviation: abbrRef.current!.value,
    //   plural: pluralRef.current!.value
    // }, authCtx.token!)
    // .then(response => {
    //   console.log(response);
    // });
  };

  return (
    // TODO: CSRF tokens for forms?
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor='new-name-name'>Name</label>
        <input id='new-name-name' name='name' type='text' max='200' required
          ref={nameRef} />
      </div>
      <div>
        <label htmlFor='new-name-abbreviation'>Abbreviation</label>
        {/* TODO: abbr. required? */}
        <input id='new-name-abbreviation' name='abbreviation' max='15' required
          ref={abbrRef} />
      </div>
      <div>
        <label htmlFor='new-name-plural'>Plural</label>
        <input id='new-name-plural' name='plural' type='text' max='200'
          ref={pluralRef} />
      </div>
      <button type='submit' onClick={onSubmit}>Submit</button>
    </form>
  )
}

export default NewNameForm;
