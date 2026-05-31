import {
    ItemEnchantableComponent
} from "@minecraft/server";

export function serializeItem(
    itemStack
) {
    if (!itemStack) {
        return null;
    }

    let enchantments = [];

    try {
        const enchantable =
            itemStack.getComponent(
                "minecraft:enchantable"
            );

        if (enchantable) {
            const list =
                enchantable.getEnchantments();

            enchantments =
                list.map(
                    enchant => ({
                        type:
                            enchant.type.id,
                        level:
                            enchant.level
                    })
                );
        }
    }
    catch {}

    return {
        typeId:
            itemStack.typeId,

        amount:
            itemStack.amount,

        nameTag:
            itemStack.nameTag ??
            "",

        lore:
            itemStack.getLore(),

        enchantments,

        keepOnDeath:
            itemStack.keepOnDeath,

        lockMode:
            itemStack.lockMode
    };
}
