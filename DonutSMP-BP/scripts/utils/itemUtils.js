// Item Utilities
export function isValidItem(item) {
  return item && item.typeId && item.amount > 0;
}

export function getItemDisplayName(item) {
  return item.nameTag || item.typeId.replace('minecraft:', '');
}

export function cloneItem(item) {
  return { ...item };
}
