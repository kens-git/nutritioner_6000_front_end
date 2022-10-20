import React, { useContext, useRef } from "react";
import AuthContext from "../../store/AuthContext";
import NameContext from "../../store/NameDataContext";
import { POST } from '../../utility/Requests';
import { button_classes, input_classes }
  from "../tailwind_classes";

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
  const nameDataCtx = useContext(NameContext);

  const onSubmit = (event: any) => {
    event.preventDefault();
    nameDataCtx.add({
      name: nameRef.current!.value,
      abbreviation: abbrRef.current!.value,
      plural: pluralRef.current!.value
    });
  };

  return (
    // TODO: CSRF tokens for forms?
    <form className='max-w-lg gap-1.5 grid grid-cols-2'
        onSubmit={onSubmit}>
      <label htmlFor='new-name-name'>Name</label>
      <input className={input_classes} id='new-name-name' name='name' type='text' max='200' required
        ref={nameRef} />
      <label htmlFor='new-name-abbreviation'>Abbreviation</label>
      <input className={input_classes} id='new-name-abbreviation' name='abbreviation' max='15' required
        ref={abbrRef} />
      <label htmlFor='new-name-plural'>Plural</label>
      <input className={input_classes} id='new-name-plural' name='plural' type='text' max='200'
        ref={pluralRef} />
      <button className={button_classes + ' col-span-2'} type='submit' onClick={onSubmit}>Submit</button>
    </form>
  )
}

export default NewNameForm;
