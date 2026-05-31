// Sell Command
import { moneyManager } from '../economy/moneyManager';

export function sellCommand(event) {
  const player = event.sender;
  const args = event.message.split(' ');
  
  // Handle sell logic here
  player.sendMessage('§cSell command not yet implemented');
}
