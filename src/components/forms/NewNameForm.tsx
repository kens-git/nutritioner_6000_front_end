const NewNameForm: React.FC<{}> = (props) => {
  return (
    <form>
      <div>
        <label htmlFor='new-name-name'>Name</label>
        <input id='new-name-name' name='name' type='text' max='200' required />
      </div>
      <div>
        <label htmlFor='new-name-abbreviation'>Abbreviation</label>
        {/* TODO: required? */}
        <input id='new-name-abbreviation' name='abbreviation' max='15' required />
      </div>
      <div>
        <label htmlFor='new-name-plural'>Plural</label>
        <input id='new-name-plural' name='plural' type='text' max='200' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default NewNameForm;
