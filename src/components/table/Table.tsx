import { useContext } from 'react';
import ConsumableNutrient from "../../types/ConsumableNutrient";
import Intake from "../../types/Intake";
import Nutrient from "../../types/Nutrient";
import Target from '../../types/Target';
import NutrientDataContext from "../../store/NutrientDataContext";
import TargetDataContext from '../../store/TargetDataContext';
import { Columns, ColumnIndex, NutrientId, Row } from './types';
import Header from './Header';
import IntakeRow from './IntakeRow';
import InfoRow, { extractTarget, extractTotal }  from './InfoRow';
import { getLatest } from '../../utility/context_utilities';

const construct_row_data = (columns: Columns, intakes: Intake[]): Row[] => {
  const data: Row[] = [];
  for(const intake of intakes) {
    const row: Row = {
      name: intake.consumable.name,
      category: intake.consumable.category.name.name,
      timestamp: intake.timestamp,
      unit: intake.consumable.unit.name.name,
      intake_size: intake.serving_size,
      nutrient_values: new Array<(number | null)>(
        columns.details.length).fill(0)
    }
    for(const nutrient of intake.consumable.nutrients) {
      const nutrient_index = columns.nutrient_map.get(nutrient.nutrient.id)!;
      const consumed_nutrients = nutrient.value * intake.serving_size;
      row.nutrient_values[nutrient_index] = consumed_nutrients;
      columns.details[nutrient_index].total += consumed_nutrients;
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

const construct_column_data = (nutrients: Nutrient[],
    targets: Target | undefined) => {
  const sorted_nutrients = sort_nutrients(nutrients);
  const target_nutrients =
    new Map(targets?.nutrients.map(consumable_nutrient =>
      [consumable_nutrient.nutrient.id, consumable_nutrient]));
  const columns: Columns = {
    nutrient_map: new Map<NutrientId, ColumnIndex>(),
    details: []};
  for(const [index, nutrient] of sorted_nutrients.entries()) {
    columns.nutrient_map.set(nutrient.id, index);
    const target_nutrient = target_nutrients.get(nutrient.id);
    columns.details.push({
      nutrient: nutrient.id,
      name: nutrient.name.name + ' (' +
        nutrient.unit.name.abbreviation + ')',
      target: target_nutrient ? target_nutrient.value : 0,
      total: 0,
      is_used: false
    });
  }
  return columns;
}

export interface TableProps {
  data: Intake[];
}

const Table: React.FC<TableProps> = (props) => {
  const nutrientCtx = useContext(NutrientDataContext);
  const targetCtx = useContext(TargetDataContext);
  if(!nutrientCtx.isLoaded || !targetCtx.isLoaded) {
    return <p>Waiting for data...</p>
  }
  const columns = construct_column_data(
    Array.from(nutrientCtx.data.values()), getLatest(targetCtx.data));
  const row_data = construct_row_data(columns, props.data);

  return (
    row_data.length === 0 ?
      <p>No data to display.</p>
    :
      <div className='overflow-auto'>
        <table className='mt-2 w-full text-left'>
          <thead className='text-gray-700 italic border-b-2 border-b-sky-300'>
            <Header details={columns.details} />
          </thead>
          <tbody>
            {row_data.map((row, index) => {
              return <IntakeRow
                key={row.name + index}
                row={row}
                column_details={columns.details} />
            })}
            <tr className='h-4'></tr>
            <InfoRow
              row={{name: 'Target', nutrient_values: []}}
              column_details={columns.details}
              extract={extractTarget}
            />
            <InfoRow
              row={{name: 'Total', nutrient_values: []}}
              column_details={columns.details}
              extract={extractTotal}
            />
          </tbody>
        </table>
      </div>
  );
}

export default Table;
