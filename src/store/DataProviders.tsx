import ConsumableCategoryDataContext, { ConsumableCategoryDataProvider } from "./ConsumableCategoryDataContext";
import { NameDataProvider } from "./NameDataContext";
import { NutrientDataProvider } from "./NutrientDataContext";
import { UnitDataProvider } from "./UnitDataContext";

const DataProviders
    : React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <NameDataProvider>
      <UnitDataProvider>
        <ConsumableCategoryDataProvider>
          <NutrientDataProvider>
            {props.children}
          </NutrientDataProvider>
        </ConsumableCategoryDataProvider>
      </UnitDataProvider>
    </NameDataProvider>
  )
}

export default DataProviders;
