import InputIntakeForm from "../components/forms/InputIntakeForm";
import Table from "../components/table/Table";

const HomePage: React.FC<{}> = (props) => {
  return (
    <>
      <h1>Enter Intake</h1>
      <InputIntakeForm />
      <h1>Daily Intake</h1>
      <input type='data' value='2022-01-01' />
      <Table />
    </>
  );
}

export default HomePage;
