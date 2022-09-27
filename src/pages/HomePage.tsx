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
    if(authCtx.isLoggedIn) {
      axios.get('http://localhost:8000/api/name', {
        headers: {
          'Authorization': `Token ${authCtx.token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res.data);
      });
    }
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
