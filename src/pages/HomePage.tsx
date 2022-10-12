import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AuthContext from "../store/AuthContext";
import Card from '../components/ui/Card';
import InputIntakeForm from "../components/forms/InputIntakeForm";
import Table from "../components/table/Table";
import SectionHeader from '../components/ui/SectionHeader';
import { input_classes } from '../components/tailwind_classes';
import { set_end_of_day, set_start_of_day } from '../utility/date_utilities';
import { DateRange } from '../components/table/Table';

const HomePage: React.FC<{}> = (props) => {
  const authCtx = useContext(AuthContext);
  const [date, setDate] = useState<Date>(new Date());

  const onDateChange: React.ChangeEventHandler<HTMLInputElement> =
      (event) => {
    const input = event.currentTarget.value.split('-');
    setDate(new Date(+input[0], +input[1] - 1, +input[2]));
  }

  const start = new Date(date.getTime());
  const end = new Date(date.getTime());
  const dates: DateRange = {
    start: set_start_of_day(start),
    end: set_end_of_day(end)
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
          defaultValue={date.toDateString()}/>
        <Table dates={dates} />
      </Card>
    </>
  );
}

export default HomePage;
