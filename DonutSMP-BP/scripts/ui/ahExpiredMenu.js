import {
    ActionFormData
} from "@minecraft/server-ui";

import {
    getExpiredItems,
    removeExpiredItem
} from "../database/playerDatabase.js";

import {
    deserializeItem
} from "../utils/itemSerializer.js";

export async function openExpiredMenu(
    player
) {
    const items =
        getExpiredItems(
            player.name
        );

    const form =
        new ActionFormData();

    form.title(
        "Expired Items"
    );

    if (
        items.length === 0
    ) {
        form.body(
            "No expired items."
        );
    }

    for (
        const item
        of items
    ) {
        const name =
            item.nameTag ||
            item.typeId.replace(
                "minecraft:",
                ""
            );

        form.button(
            `${name}\n§7x${item.amount}`
        );
    }

    const result =
        await form.show(
            player
        );

    if (
        result.canceled
    ) {
        return;
    }

    const index =
        result.selection;

    const selected =
        items[index];

    if (!selected) {
        return;
    }

    const inventory =
        player.getComponent(
            "minecraft:inventory"
        );

    const container =
        inventory.container;

    const item =
        deserializeItem(
            selected
        );

    const remain =
        container.addItem(
            item
        );

    if (remain) {
        player.sendMessage(
            "§cInventory full."
        );

        return;
    }

    removeExpiredItem(
        player.name,
        index
    );

    player.sendMessage(
        `§i[§1AH§i]: Retrieved ${item.typeId} x${item.amount}!`
    );
}
