import {
    ActionFormData
} from "@minecraft/server-ui";

import {
    getClaimMoney,
    removeClaimMoney
} from "../database/playerDatabase.js";

import {
    addMoney
} from "../economy/moneyManager.js";

import {
    formatPrice
} from "../utils/priceParser.js";

export async function openClaimMoneyMenu(
    player
) {
    const claims =
        getClaimMoney(
            player.name
        );

    const form =
        new ActionFormData();

    form.title(
        "Claim Money"
    );

    if (
        claims.length === 0
    ) {
        form.body(
            "No money to claim."
        );
    }

    for (
        const money
        of claims
    ) {
        form.button(
            `$${formatPrice(
                money
            )}`
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

    const amount =
        claims[index];

    if (
        amount ===
        undefined
    ) {
        return;
    }

    addMoney(
        player,
        amount
    );

    removeClaimMoney(
        player.name,
        index
    );

    player.sendMessage(
        `§i[§1AH§i]: Claimed $${formatPrice(
            amount
        )}!`
    );
}
