import { ConsumableDataProvider } from "./ConsumableDataContext";
import { ConsumableCategoryDataProvider } from "./ConsumableCategoryDataContext";
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
            <ConsumableDataProvider>
              {props.children}
            </ConsumableDataProvider>
          </NutrientDataProvider>
        </ConsumableCategoryDataProvider>
      </UnitDataProvider>
    </NameDataProvider>
  )
}

export default DataProviders;
