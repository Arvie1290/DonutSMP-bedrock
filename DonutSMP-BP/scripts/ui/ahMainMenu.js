// Auction House Main Menu UI
import { ahBuyMenu } from './ahBuyMenu';
import { ahYourItemsMenu } from './ahYourItemsMenu';

export function ahMainMenu(player) {
  player.sendMessage('§l§6=== Auction House ==="');
  player.sendMessage('§a[Buy] §e/ah buy');
  player.sendMessage('§a[Sell] §e/ah sell');
  player.sendMessage('§a[Your Items] §e/ah items');
}
