import { useContext, useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Intake from '../types/Intake';
import InputIntakeForm from "../components/forms/InputIntakeForm";
import Table from "../components/table/Table";
import SectionHeader from '../components/ui/SectionHeader';
import { input_classes } from '../components/tailwind_classes';
import { is_same_day, getDayRangeISOString }
  from '../utility/date_utilities';
import IntakeDataContext from '../store/IntakeDataContext';

/** Component displaying the home page. */
const HomePage: React.FC<{}> = (props) => {
  const intakeCtx = useContext(IntakeDataContext);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [data, setData] = useState<Intake[]>([]);

  const onDateChange: React.ChangeEventHandler<HTMLInputElement> =
      (event) => {
    const input = event.currentTarget.value.split('-');
    const date = new Date(+input[0], +input[1] - 1, +input[2]);
    setCurrentDate(date);
    intakeCtx.fetch(getDayRangeISOString(date)).then(data => {
      setData(data);
    });
  }

  const onIntakeSubmitted = (intake: Intake) => {
    if(is_same_day(new Date(intake.timestamp), currentDate)) {
      setData([...data, intake]);
    }
  }

  useEffect(() => {
    intakeCtx.fetch(getDayRangeISOString(currentDate)).then(data => {
      setData(data);
    });
  }, []);

  return (
    <>
      <Card>
        <SectionHeader label='Enter Intake' />
        <InputIntakeForm onSubmit={onIntakeSubmitted} />
      </Card>
      <Card>
        <SectionHeader label='Daily Intake' />
        <label className='mr-2'>Current Date:</label>
        <input className={input_classes} onChange={onDateChange} type='date'
          defaultValue={currentDate.toLocaleDateString('en-CA')}/>
        <Table data={data} />
      </Card>
    </>
  );
}

export default HomePage;
