import React from 'react';
import { Color, getHex, interpolate } from '../../utility/color';
import { ColumnDetails, Row } from './types';

const TARGET_START_COLOR: Color = {
  red: 125,
  green: 100,
  blue: 120
};

const TARGET_END_COLOR: Color = {
  red: 125,
  green: 211,
  blue: 252
}

export const extractTarget = (details: ColumnDetails, index: number) => {
  if(!details.is_used) {
    return null;
  }
  return <td key={index} className='text-right'>{details.target}</td>;
}

export const extractTotal = (details: ColumnDetails, index: number) => {
  if(!details.is_used) {
    return null;
  }
  return <td
    key={index}
    style={{backgroundColor: `${getHex(interpolate(
      TARGET_START_COLOR,
      TARGET_END_COLOR,
      details.total / details.target))}FF`}}
    className='text-right'>{details.total}</td>
}

interface RowProps {
  row: Row;
  column_details: ColumnDetails[];
  extract: (details: ColumnDetails, index: number) => React.ReactElement | null;
}

const InfoRow: React.FC<RowProps> = (props) => {
  return (
    <tr>
      <td>{props.row.name}</td>
      <td>{props.row.category}</td>
      <td>{props.row.timestamp ? new Date(props.row.timestamp!).toLocaleTimeString() : ''}</td>
      <td>{props.row.intake_size}</td>
      <td>{props.row.unit}</td>
      {props.column_details.map((details, index) => {
        return props.extract(details, index);
      })}
    </tr>
  );
}

export default InfoRow;
