import IntakeModel from "../IntakeModel";
import OperationCode from "../types/OperationCode";
import Intake from "../types/Intake";
import User from '../types/User';
import { is_same_day, set_end_of_day, set_start_of_day }
  from '../../utility/date_utilities';

class LocalIntakeModel extends IntakeModel {
  #intakes = new Map<number, Intake[]>();

  get_intakes(
      user: User, date: Date): Promise<Intake[]> {
    return new Promise<Intake[]>((resolve, reject) => {
      if(!this.#intakes.has(user.id)) {
        resolve([]);
        return;
      }
      resolve(this.#intakes.get(user.id)!.filter((intake) => {
        return is_same_day(intake.timestamp, date);
      }));
    });
  }

  get_intakes_range(user: User,
      start: Date, end: Date): Promise<Intake[]> {
    return new Promise<Intake[]>((resolve, reject) => {
      if(!this.#intakes.has(user.id)) {
        resolve([]);
        return;
      }
      const start_day = set_start_of_day(new Date(start));
      const end_day = set_end_of_day(new Date(end));
      resolve(this.#intakes.get(user.id)!.filter((intake) => {
        return start_day <= intake.timestamp &&
          intake.timestamp <= end_day;
      }));
    });
  }

  add_intake(user: User, intake: Intake):
      Promise<OperationCode> {
    return new Promise<OperationCode>((resolve, reject) => {
      if(!this.#intakes.has(user.id)) {
        this.#intakes.set(user.id, []);
      }
      this.#intakes.get(user.id)?.push(intake);
      resolve(OperationCode.SUCCESS);
    });
  }
}

export default LocalIntakeModel;
