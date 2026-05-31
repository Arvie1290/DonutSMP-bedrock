// Page Manager - Handles pagination for listings
export class PageManager {
  constructor(itemsPerPage = 10) {
    this.itemsPerPage = itemsPerPage;
  }
  
  getPage(items, pageNumber) {
    const start = (pageNumber - 1) * this.itemsPerPage;
    return items.slice(start, start + this.itemsPerPage);
  }
  
  getTotalPages(itemCount) {
    return Math.ceil(itemCount / this.itemsPerPage);
  }
}

export const pageManager = new PageManager();
