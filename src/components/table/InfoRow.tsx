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

/**
 * Function to return the target from the given column.
 * 
 * @param details The details of the column.
 * @param index The index of the given column.
 * @returns A td element containing the target amount for the given index, or
 *          null if the column isn't used.
 */
export const extractTarget = (details: ColumnDetails, index: number) => {
  if(!details.is_used) {
    return null;
  }
  return <td key={index} className='text-right'>{details.target}</td>;
}

/**
 * Function to return the total from the given column.
 * 
 * @param details The details of the column.
 * @param index The index of the given column.
 * @returns A td element containing the total amount for the given index, or
 *          null if the column isn't used.
 */
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

/** Defines the props accepted by the InfoRow. */
interface RowProps {

  /** Contains the data for the row. */
  row: Row;

  /** The table's column details. */
  column_details: ColumnDetails[];

  /** 
   * Function used to retrieve the element for a particular cell in the row.
   * 
   * @param details The column details for the column.
   * @param index The index of the column.
  */
  extract: (details: ColumnDetails, index: number) => React.ReactElement | null;
}

/** Component to display a table row that provides nutrient values without an associated consumable. */
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
