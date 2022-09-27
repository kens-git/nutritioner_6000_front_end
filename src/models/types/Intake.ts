import Consumable from "./Consumable";

interface Intake {
  id: number;
  timestamp: Date;
  consumable: Consumable;
  serving_size: number;
}

export default Intake;
