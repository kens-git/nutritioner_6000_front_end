import { ConsumableDataProvider } from "./ConsumableDataContext";
import { ConsumableCategoryDataProvider } from "./ConsumableCategoryDataContext";
import { NameDataProvider } from "./NameDataContext";
import { NutrientDataProvider } from "./NutrientDataContext";
import { UnitDataProvider } from "./UnitDataContext";
import { TargetDataProvider } from "./TargetDataContext";
import { DailyValueDataProvider } from "./DailyValueDataContext";
import { IntakeDataProvider } from "./IntakeDataContext";

/** Component to collect the DataContext providers in one place. */
const DataProviders
    : React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <NameDataProvider>
      <UnitDataProvider>
        <ConsumableCategoryDataProvider>
          <NutrientDataProvider>
            <ConsumableDataProvider>
              <TargetDataProvider>
                <DailyValueDataProvider>
                  <IntakeDataProvider>
                    {props.children}
                  </IntakeDataProvider>
                </DailyValueDataProvider>
              </TargetDataProvider>
            </ConsumableDataProvider>
          </NutrientDataProvider>
        </ConsumableCategoryDataProvider>
      </UnitDataProvider>
    </NameDataProvider>
  )
}

export default DataProviders;
