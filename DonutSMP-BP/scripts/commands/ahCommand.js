// Auction House Main Command
import { ahMainMenu } from '../ui/ahMainMenu';

export function ahCommand(event) {
  const player = event.sender;
  ahMainMenu(player);
}
