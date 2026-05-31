import { ItemStack } from "@minecraft/server";

/**
 * Ubah ItemStack -> data JSON yang bisa disimpan.
 */
export function serializeItem(itemStack) {
    if (!itemStack) return null;

    let enchantments = [];
    try {
        const enchantable = itemStack.getComponent("minecraft:enchantable");
        if (enchantable) {
            enchantments = enchantable.getEnchantments().map((ench) => ({
                typeId: ench.type.id,
                level: ench.level
            }));
        }
    } catch {
        enchantments = [];
    }

    let canDestroy = [];
    let canPlaceOn = [];

    try {
        canDestroy = itemStack.getCanDestroy?.() ?? [];
    } catch {
        canDestroy = [];
    }

    try {
        canPlaceOn = itemStack.getCanPlaceOn?.() ?? [];
    } catch {
        canPlaceOn = [];
    }

    return {
        typeId: itemStack.typeId,
        amount: itemStack.amount,
        nameTag: itemStack.nameTag ?? "",
        lore: itemStack.getLore?.() ?? [],
        keepOnDeath: !!itemStack.keepOnDeath,
        canDestroy,
        canPlaceOn,
        enchantments
    };
}

/**
 * Ubah data JSON -> ItemStack lagi.
 */
export function deserializeItem(data) {
    if (!data?.typeId) return undefined;

    const item = new ItemStack(data.typeId, data.amount ?? 1);

    if (data.nameTag) {
        item.nameTag = data.nameTag;
    }

    if (Array.isArray(data.lore) && data.lore.length > 0) {
        item.setLore(data.lore);
    }

    try {
        if (Array.isArray(data.canDestroy) && data.canDestroy.length > 0) {
            item.setCanDestroy(data.canDestroy);
        }
    } catch {}

    try {
        if (Array.isArray(data.canPlaceOn) && data.canPlaceOn.length > 0) {
            item.setCanPlaceOn(data.canPlaceOn);
        }
    } catch {}

    try {
        item.keepOnDeath = !!data.keepOnDeath;
    } catch {}

    try {
        const enchantable = item.getComponent("minecraft:enchantable");
        if (enchantable && Array.isArray(data.enchantments) && data.enchantments.length > 0) {
            const enchList = data.enchantments.map((e) => ({
                type: e.typeId,
                level: e.level
            }));
            enchantable.addEnchantments(enchList);
        }
    } catch {}

    return item;
}

/**
 * Cek apakah item masih valid buat AH.
 */
export function isSerializableItem(itemStack) {
    return !!itemStack && typeof itemStack.typeId === "string";
}
