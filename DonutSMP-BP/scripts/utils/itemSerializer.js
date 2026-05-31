// Item Serializer - Converts items to/from JSON
export function serializeItem(item) {
  return {
    typeId: item.typeId,
    amount: item.amount,
    lore: item.getLore ? item.getLore() : [],
    name: item.nameTag || null
  };
}

export function deserializeItem(data) {
  // Create item from serialized data
  return data;
}
