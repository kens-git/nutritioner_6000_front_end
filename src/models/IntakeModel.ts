import OperationCode from "./types/OperationCode";
import Intake from "./types/Intake";
import User from './types/User';

abstract class IntakeModel {
  abstract get_intakes(
    user: User, date: Date): Promise<Intake[]>;

  abstract get_intakes_range(user: User,
    start: Date, end: Date): Promise<Intake[]>;

  abstract add_intake(user: User, intake: Intake):
    Promise<OperationCode>;
}

export default IntakeModel;
