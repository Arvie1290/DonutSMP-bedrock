// Auction House Database
export class AHDatabase {
  constructor() {
    this.listings = [];
    this.listingCounter = 0;
  }
  
  saveListing(listing) {
    listing.id = this.listingCounter++;
    this.listings.push(listing);
    return listing.id;
  }
  
  getListing(id) {
    return this.listings.find(l => l.id === id);
  }
  
  deleteListing(id) {
    this.listings = this.listings.filter(l => l.id !== id);
  }
  
  getAllListings() {
    return this.listings;
  }
}

export const ahDatabase = new AHDatabase();
