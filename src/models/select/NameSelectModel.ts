import Name from "../../types/Name";
import SelectItem from "../../types/SelectItem";
import { GET } from '../../utility/Requests';

class NameSelectModel {
  static get(token: string): Promise<SelectItem[]> {
    // TODO: fetch from single source
    return GET<Name[]>('name', token).then(response => {
      return response!.data.map<SelectItem>(item => {
        return {
          id: item.id.toString(),
          label: item.name
        };
      });
    });
  }
}

export default NameSelectModel;
