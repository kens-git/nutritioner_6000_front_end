interface SelectProps {
  id?: string;
  name?: string;
}

const Select: React.FC<SelectProps> = (props) => {
  return (
    <select id={props.id} name={props.name}>
      <option>Hello</option>
      <option>Salute</option>
    </select>
  );
}

export default Select;
