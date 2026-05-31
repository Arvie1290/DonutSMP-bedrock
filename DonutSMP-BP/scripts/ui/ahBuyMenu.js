import {
    MessageFormData
} from "@minecraft/server-ui";

import {
    deserializeItem
} from "../utils/itemSerializer.js";

import {
    hasMoney,
    removeMoney
} from "../economy/moneyManager.js";

import {
    addClaimMoney
} from "../database/playerDatabase.js";

import {
    deleteListing
} from "../auction/listingManager.js";

import {
    formatPrice
} from "../utils/priceParser.js";

import {
    formatRemainingTime
} from "../utils/timeUtils.js";

import {
    openAHMenu
} from "./ahMainMenu.js";

export async function openBuyMenu(
    player,
    listing
) {
    const form =
        new MessageFormData();

    form.title(
        "Confirm Purchase"
    );

    form.body(
`Seller: ${listing.seller}

Bought money: ${formatPrice(
listing.price
)}

Expired: ${formatRemainingTime(
listing.expiredAt
)}`
    );

    form.button1(
        "§aBuy"
    );

    form.button2(
        "§cCancel"
    );

    const result =
        await form.show(
            player
        );

    if (
        result.canceled
    ) {
        return;
    }

    /*
    button1 = Buy
    button2 = Cancel

    selection:
    0 = button1
    1 = button2
    */

    if (
        result.selection === 1
    ) {
        openAHMenu(
            player
        );

        return;
    }

    if (
        !hasMoney(
            player,
            listing.price
        )
    ) {
        player.sendMessage(
            "§cNot enough money."
        );

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
            listing.item
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

    removeMoney(
        player,
        listing.price
    );

    addClaimMoney(
        listing.seller,
        listing.price
    );

    deleteListing(
        listing.id
    );

    player.sendMessage(
        `§i[§1AH§i]: Successful Bought ${item.typeId} x${item.amount}!`
    );
}
