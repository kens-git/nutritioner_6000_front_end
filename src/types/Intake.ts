import Consumable from "./Consumable";
import Id from "./Id";

interface Intake {
  id: Id;
  timestamp: Date;
  consumable: Consumable;
  serving_size: number;
}

export default Intake;
