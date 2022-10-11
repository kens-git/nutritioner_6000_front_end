import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AuthContext from "../store/AuthContext";
import Card from '../components/ui/Card';
import InputIntakeForm from "../components/forms/InputIntakeForm";
import Table from "../components/table/Table";
import SectionHeader from '../components/ui/SectionHeader';
import { input_classes } from '../components/tailwind_classes';

const HomePage: React.FC<{}> = (props) => {
  const authCtx = useContext(AuthContext);
  const [date, setDate] = useState<string>(
    new Date().toLocaleDateString('en-CA'));

  const onDateChange: React.ChangeEventHandler<HTMLInputElement> =
      (event) => {
    setDate(event.currentTarget.value);
  }

  return (
    <>
      <Card>
        <SectionHeader label='Enter Intake' />
        <InputIntakeForm />
      </Card>
      <Card>
        <SectionHeader label='Daily Intake' />
        <label className='mr-2'>Current Date:</label>
        <input className={input_classes} onChange={onDateChange} type='date'
          defaultValue={date}/>
        <Table />
      </Card>
    </>
  );
}

export default HomePage;
