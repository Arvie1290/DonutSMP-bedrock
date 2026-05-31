// Money Manager - Handles economy
export class MoneyManager {
  constructor() {
    this.playerMoney = {};
    this.pendingPayments = {};
  }
  
  getBalance(playerId) {
    return this.playerMoney[playerId] || 0;
  }
  
  addMoney(playerId, amount) {
    if (!this.playerMoney[playerId]) {
      this.playerMoney[playerId] = 0;
    }
    this.playerMoney[playerId] += amount;
  }
  
  removeMoney(playerId, amount) {
    if (this.playerMoney[playerId]) {
      this.playerMoney[playerId] = Math.max(0, this.playerMoney[playerId] - amount);
    }
  }
  
  addPendingPayment(playerId, amount) {
    if (!this.pendingPayments[playerId]) {
      this.pendingPayments[playerId] = 0;
    }
    this.pendingPayments[playerId] += amount;
  }
}

export const moneyManager = new MoneyManager();
