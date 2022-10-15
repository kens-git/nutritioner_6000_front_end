import React from 'react';
import { ColumnDetails, Row } from './types';

interface RowProps {
  row: Row;
  column_details: ColumnDetails[];
}

const IntakeRow: React.FC<RowProps> = (props) => {
  return (
    <tr>
      <td>{props.row.name}</td>
      <td>{props.row.category}</td>
      <td>{props.row.timestamp ? new Date(props.row.timestamp!).toLocaleTimeString() : ''}</td>
      <td>{props.row.intake_size}</td>
      <td>{props.row.unit}</td>
      {props.row.nutrient_values.map((value, index) => {
        if(!props.column_details[index].is_used) {
          return null;
        }
        return <td key={index} className='text-right'>{value || ''}</td>
      })}
    </tr>
  );
}

export default IntakeRow;
