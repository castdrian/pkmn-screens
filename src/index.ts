import type { MoveArgs, PartyArgs } from './@types';
import { moveScreen } from './screens/moves';
import { partyScreen } from './screens/party';

export class Screens {
  static async moves(data: MoveArgs): Promise<Buffer> {
    const buffer = await moveScreen(data.data, data.anim);
    return buffer;
  }

  static async party(data: PartyArgs): Promise<Buffer> {
    const buffer = await partyScreen(data.data, data.anim);
    return buffer;
  }
}
