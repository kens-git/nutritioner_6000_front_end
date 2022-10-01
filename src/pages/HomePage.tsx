import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AuthContext from "../store/AuthContext";
import InputIntakeForm from "../components/forms/InputIntakeForm";
import Table from "../components/table/Table";

const HomePage: React.FC<{}> = (props) => {
  const authCtx = useContext(AuthContext);
  const [date, setDate] = useState<string>(
    new Date(Date.now()).toLocaleDateString('en-CA'));

  const onDateChange: React.ChangeEventHandler<HTMLInputElement> =
      (event) => {
    setDate(event.currentTarget.value);
  }

  return (
    <>
      <h1>Enter Intake</h1>
      <InputIntakeForm />
      <h1>Daily Intake</h1>
      <input onChange={onDateChange} type='date'
        defaultValue={date}/>
      <Table />
    </>
  );
}

export default HomePage;
