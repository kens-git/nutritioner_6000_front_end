import { useContext, useRef, useState } from "react";
import Nutrient from "../../types/Nutrient";
import NutrientDataContext from "../../store/NutrientDataContext";
import Select, { extractNutrientItem } from "../ui/Select";
import ConsumableNutrient from "../../types/ConsumableNutrient";
import NutrientValueInputListItem, { NutrientValueListItemData }
  from "./NutrientValueInputListItem";
import NutrientValueLabelListItem from './NutrientValueLabelListItem';

interface NutrientValueListProps {
  title: string;
  description: string;
}

const NutrientValueList: React.FC<NutrientValueListProps> = (props) => {
  const nutrientCtx = useContext(NutrientDataContext);
  const [list, setList] = useState<ConsumableNutrient[]>([]);

  const onItemAdded = (nutrient: NutrientValueListItemData) => {
    // TODO: needs to convert DVs to scalars
    const index = list.findIndex(item => item.nutrient.id === nutrient.nutrient_id);
    if(index == -1) {
      const consumable_nutrient: ConsumableNutrient = {
        id: -1, // TODO: ???
        nutrient: nutrientCtx.get(nutrient.nutrient_id)!,
        value: nutrient.value
      }
      setList([...list, consumable_nutrient]);
      return;
    }
    const updated_list = [...list];
    updated_list[index] = {
      id: -1,
      nutrient: updated_list[index].nutrient,
      value: nutrient.value + updated_list[index].value
    };
    setList(updated_list);
  }

  const onItemRemoved = (removed_index: number) => {
    const updated_list = [...list];
    setList(updated_list.filter((item, index) => { return index !== removed_index; }));
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
      {list.map((nutrient, index) => {
        return <NutrientValueLabelListItem
          key={index}
          name={nutrient.nutrient.name.name}
          value={nutrient.value}
          unit={nutrient.nutrient.unit.name.abbreviation}
          index={index}
          onRemove={onItemRemoved} />
      })}
      <NutrientValueInputListItem onSubmit={onItemAdded} />
    </div>
  );
}

export default NutrientValueList;
