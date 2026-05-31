// Listing Manager
export class ListingManager {
  constructor() {
    this.playerListings = {};
  }
  
  getPlayerListings(playerId) {
    return this.playerListings[playerId] || [];
  }
  
  addListing(playerId, listing) {
    if (!this.playerListings[playerId]) {
      this.playerListings[playerId] = [];
    }
    this.playerListings[playerId].push(listing);
  }
  
  removeListing(playerId, listingId) {
    // Remove listing
  }
}

export const listingManager = new ListingManager();
