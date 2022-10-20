import React from 'react';
import { ColumnDetails, Row } from './types';

/** Defines the props accepted by the IntakeRow. */
interface RowProps {

  /** Contains the data for the row. */
  row: Row;

  /** The column details for the table. */
  columnDetails: ColumnDetails[];
}

/** A component for displaying an intake in a table row. */
const IntakeRow: React.FC<RowProps> = (props) => {
  return (
    <tr>
      <td>{props.row.name}</td>
      <td>{props.row.category}</td>
      <td>{props.row.timestamp ? new Date(props.row.timestamp!).toLocaleTimeString() : ''}</td>
      <td>{props.row.intake_size}</td>
      <td>{props.row.unit}</td>
      {props.row.nutrient_values.map((value, index) => {
        if(!props.columnDetails[index].is_used) {
          return null;
        }
        return <td key={index} className='text-right'>{value || ''}</td>
      })}
    </tr>
  );
}

export default IntakeRow;
