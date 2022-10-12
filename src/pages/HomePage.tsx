import { useContext, useState } from 'react';
import Card from '../components/ui/Card';
import InputIntakeForm from "../components/forms/InputIntakeForm";
import Table from "../components/table/Table";
import SectionHeader from '../components/ui/SectionHeader';
import { input_classes } from '../components/tailwind_classes';
import { set_end_of_day, set_start_of_day } from '../utility/date_utilities';
import { DateRange } from '../components/table/Table';

const getDateRange = (date: Date): DateRange => {
  return {
    start: set_start_of_day(new Date(date.getTime())),
    end: set_end_of_day(new Date(date.getTime()))
  }
}

const HomePage: React.FC<{}> = (props) => {
  const [dateRange, setDateRange] =
    useState<DateRange>(getDateRange(new Date()));

  const onDateChange: React.ChangeEventHandler<HTMLInputElement> =
      (event) => {
    const input = event.currentTarget.value.split('-');
    const date = new Date(+input[0], +input[1] - 1, +input[2]);
    setDateRange(getDateRange(date));
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
          defaultValue={dateRange.start.toLocaleDateString('en-CA')}/>
        <Table dates={dateRange} />
      </Card>
    </>
  );
}

export default HomePage;
