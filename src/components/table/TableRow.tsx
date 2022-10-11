import React from 'react';

interface TableRowData {
  data: string[];
  cell_tag: string;
};

type Props = {
  tag?: keyof JSX.IntrinsicElements;
} & React.HTMLAttributes<HTMLOrSVGElement>;

// TODO: types
const CellTag: React.FC<Props> = ({ tag: Tag = 'td', children, ...props }) => (
  <Tag {...props}>
    {children}
  </Tag>
);

const TableRow: React.FC<TableRowData> = (props) => {
  return (
    <tr>
      {props.data.map(item => {
        return <CellTag>{item}</CellTag>
      })}
    </tr>
  );
}

export default TableRow;
