// Price Parser - Parses and validates prices
export function parsePrice(input) {
  const price = parseInt(input);
  return isNaN(price) || price <= 0 ? null : price;
}

export function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}
