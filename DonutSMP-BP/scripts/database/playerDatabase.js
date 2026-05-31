// Player Database
export class PlayerDatabase {
  constructor() {
    this.players = {};
  }
  
  getPlayer(playerId) {
    return this.players[playerId];
  }
  
  savePlayer(playerId, data) {
    this.players[playerId] = data;
  }
  
  updatePlayer(playerId, data) {
    if (this.players[playerId]) {
      this.players[playerId] = { ...this.players[playerId], ...data };
    }
  }
}

export const playerDatabase = new PlayerDatabase();
