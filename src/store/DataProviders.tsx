import { ConsumableDataProvider } from "./ConsumableDataContext";
import { ConsumableCategoryDataProvider } from "./ConsumableCategoryDataContext";
import { NameDataProvider } from "./NameDataContext";
import { NutrientDataProvider } from "./NutrientDataContext";
import { UnitDataProvider } from "./UnitDataContext";
import { TargetDataProvider } from "./TargetDataContext";

const DataProviders
    : React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <NameDataProvider>
      <UnitDataProvider>
        <ConsumableCategoryDataProvider>
          <NutrientDataProvider>
            <ConsumableDataProvider>
              <TargetDataProvider>
                {props.children}
              </TargetDataProvider>
            </ConsumableDataProvider>
          </NutrientDataProvider>
        </ConsumableCategoryDataProvider>
      </UnitDataProvider>
    </NameDataProvider>
  )
}

export default DataProviders;
