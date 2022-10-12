import { useContext, useState } from 'react';
import { Color } from '../../utility/color';
import ConsumableNutrient from "../../types/ConsumableNutrient";
import Intake from "../../types/Intake";
import Nutrient from "../../types/Nutrient";
import Unit from '../../types/Unit';
// import { INTAKE_APPLE, INTAKE_BACON, INTAKE_BANANA,
//   INTAKE_MILK, INTAKE_STEAK } from "../../test_data/TestIntakes";
// import { TEST_NUTRIENTS } from "../../test_data/TestNutrients";
import { getHex, interpolate } from "../../utility/color";
import IntakeDataContext from "../../store/IntakeDataContext";
import NutrientDataContext from "../../store/NutrientDataContext";
import Consumable from '../../types/Consumable';
import { set_start_of_day, set_end_of_day }
  from '../../utility/date_utilities';
import TargetDataContext from '../../store/TargetDataContext';

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

type NutrientId = number;
type ColumnIndex = number;
type ColumnMap = Map<NutrientId, ColumnIndex>;

interface ColumnDetails {
  nutrient_id: number;
  name: string;
  target: number;
  total: number;
  is_used: boolean;
}

interface Columns {
  // maps a nutrient id to the column that contains its data
  nutrient_map: ColumnMap;
  // columns in order of index
  details: ColumnDetails[];
}

interface TableRowData {
  name: string;
  category: string;
  timestamp: Date;
  unit: string;
  intake_size: number;
  nutrient_values: (number | null)[];
}

  // TODO: when to use types, return types?
  //       when to omit?
  // TODO: may create a side effect of updating totals,
  //       so rename
  const get_row_data = (columns: Columns,
    // TODO: type alias
    intakes: Intake[]): TableRowData[] => {
  //const unitCtx = useContext(UnitDataContext);
  const data: TableRowData[] = [];
  for(const intake of intakes) {
    const row: TableRowData = {
      name: intake.consumable.name,
      category: intake.consumable.category.name.name,
      timestamp: intake.timestamp,
      unit: intake.consumable.unit.name.name,
      intake_size: intake.serving_size,
      nutrient_values: new Array<(number | null)>(
        columns.details.length).fill(0)
    }
    for(const nutrient of intake.consumable.nutrients) {
      const nutrient_index =
        columns.nutrient_map.get(nutrient.nutrient.id)!;
      const consumed_nutrients = nutrient.value *
        intake.serving_size;
      row.nutrient_values[nutrient_index] =
        consumed_nutrients;
      columns.details[nutrient_index].total +=
        consumed_nutrients;
      columns.details[nutrient_index].is_used = true;
    }
    data.push(row);
  }
  return data;
}

const sort_nutrients = (nutrients: Nutrient[]) => {
  const sorted_nutrients = [...nutrients];
  sorted_nutrients.sort((first, second) => {
    if(first.is_macronutrient || second.is_macronutrient) {
      if(!first.is_macronutrient) {
        return 1;
      } else if(!second.is_macronutrient) {
        return -1;
      }
    }
    return first.name.name.localeCompare(second.name.name);
  });
  return sorted_nutrients;
}

const get_column_data = (
    nutrients: Nutrient[],
    targets: ConsumableNutrient[]) => {
  const target_map = new Map<number, number>();
  const sorted_nutrients = sort_nutrients(nutrients);
  const columns: Columns = {
    nutrient_map: new Map<NutrientId, ColumnIndex>(),
    details: []};
  for(const [index, nutrient] of sorted_nutrients.entries()) {
    columns.nutrient_map.set(nutrient.id, index);
    columns.details.push({
      nutrient_id: nutrient.id,
      name: nutrient.name.name + ' (' +
        nutrient.unit.name.abbreviation + ')',
      target: target_map.get(nutrient.id) || 0,
      total: 0,
      is_used: false
    });
  }
  return columns;
}

export interface DateRange {
  start: Date,
  end: Date
}

export interface TableProps {
  dates: DateRange
}

const Table: React.FC<TableProps> = (props) => {
  const intakeCtx = useContext(IntakeDataContext);
  const nutrientCtx = useContext(NutrientDataContext);
  const targetCtx = useContext(TargetDataContext);
  const [dates, setDates] = useState<DateRange>(props.dates);
  const [intakeData, setIntakeData] = useState<Intake[]>([]);

  const columns = get_column_data(
    Array.from(nutrientCtx.data.values()),
    targetCtx.data);
  const row_data = get_row_data(columns, intakeData);
  if(dates !== props.dates) {
    const start = props.dates.start.toISOString();
    const end = props.dates.end.toISOString();
    intakeCtx.get_params({start, end}).then(value => {
      setIntakeData(value);
    });
    setDates(props.dates);
  }
  if(row_data.length === 0) { // TODO: inline
    return (
      <p>No data to display.</p>
    )
  }
  return (
    <div className='overflow-auto'>
      <table className='mt-2 w-full text-left'>
        <thead className='text-gray-700 italic border-b-2 border-b-sky-300'>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Time</th>
            <th>Size</th>
            <th>Unit</th>
            {columns.details.map((details, index, array) => {
              if(!details.is_used) {
                return null;
              }
              return <th className='text-right'>{details.name}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {row_data.map(row => {
            return (
              <tr>
                <td>{row.name}</td>
                <td>{row.category}</td>
                <td>{new Date(row.timestamp).toLocaleTimeString()}</td>
                <td>{row.intake_size}</td>
                <td>{row.unit}</td>
                {row.nutrient_values.map((value, index, array) => {
                  if(!columns.details[index].is_used) {
                    return null;
                  }
                  // leave cell empty if the data is null
                  return <td className='text-right'>{value || ''}</td>
                })}
              </tr>
            );
          })}
          <tr className='h-4'></tr>
          <tr>
            <td>Target</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            {columns.details.map((details, index, array) => {
              if(!details.is_used) {
                return null;
              }
              return <td className='text-right'>{details.target}</td>
            })}
          </tr>
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            {columns.details.map((details, index, array) => {
              if(!details.is_used) {
                return null;
              }
              return <td
                style={{backgroundColor: `${getHex(interpolate(
                  TARGET_START_COLOR,
                  TARGET_END_COLOR,
                  details.total / details.target))}FF`}}
                className='text-right'>{details.total}</td>
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
