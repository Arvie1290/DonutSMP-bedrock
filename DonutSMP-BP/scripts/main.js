// DonutSMP Main Script
import { world } from '@minecraft/server';
import { ahCommand } from './commands/ahCommand';
import { sellCommand } from './commands/sellCommand';

// Initialize auction house
world.afterEvents.chatSend.subscribe((event) => {
  const message = event.message.toLowerCase();
  
  if (message.startsWith('/ah ')) {
    ahCommand(event);
  } else if (message.startsWith('/sell ')) {
    sellCommand(event);
  }
});

console.warn('DonutSMP Auction House Loaded!');
