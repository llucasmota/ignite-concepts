import { v4 as uuidV4 } from 'uuid';

export default class Specification {
  id?: string;
  name: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
