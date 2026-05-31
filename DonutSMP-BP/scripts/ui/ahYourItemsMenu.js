import {
    ActionFormData
} from "@minecraft/server-ui";

import {
    getExpiredItems,
    getClaimMoney
} from "../database/playerDatabase.js";

import {
    formatPrice
} from "../utils/priceParser.js";

export async function openYourItemsMenu(
    player
) {
    const expiredItems =
        getExpiredItems(
            player.name
        );

    const claimMoney =
        getClaimMoney(
            player.name
        );

    const totalMoney =
        claimMoney.reduce(
            (
                total,
                money
            ) =>
                total + money,
            0
        );

    const form =
        new ActionFormData();

    form.title(
        "Your Items"
    );

    form.button(
        `§eExpired Items\n§7${expiredItems.length} Item`
    );

    form.button(
        `§aClaim Money\n§7$${formatPrice(
            totalMoney
        )}`
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

    switch (
        result.selection
    ) {
        case 0:
            player.sendMessage(
                "TODO: Open Expired Menu"
            );
            break;

        case 1:
            player.sendMessage(
                "TODO: Open Claim Money Menu"
            );
            break;
    }
}
