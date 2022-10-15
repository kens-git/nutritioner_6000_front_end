import React from 'react';
import { ColumnDetails } from './types';

interface HeaderProps {
  details: ColumnDetails[];
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <tr>
      <th>Name</th>
      <th>Category</th>
      <th>Time</th>
      <th>Size</th>
      <th>Unit</th>
      {props.details.map((details, index) => {
        if(!details.is_used) {
          return null;
        }
        return <th key={index} className='text-right'>{details.name}</th>
      })}
    </tr>
  );
}

export default Header;
