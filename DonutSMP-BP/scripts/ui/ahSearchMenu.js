import {
    ModalFormData,
    ActionFormData
} from "@minecraft/server-ui";

import {
    searchListings
} from "../auction/listingManager.js";

import {
    formatPrice
} from "../utils/priceParser.js";

import {
    openBuyMenu
} from "./ahBuyMenu.js";

export async function openSearchMenu(
    player
) {
    const searchForm =
        new ModalFormData();

    searchForm.title(
        "Search Item"
    );

    searchForm.textField(
        "Item Name",
        "diamond"
    );

    const searchResult =
        await searchForm.show(
            player
        );

    if (
        searchResult.canceled
    ) {
        return;
    }

    const keyword =
        String(
            searchResult.formValues[0]
        )
        .trim();

    if (!keyword) {
        player.sendMessage(
            "§cEnter item name."
        );

        return;
    }

    const listings =
        searchListings(
            keyword
        );

    const resultForm =
        new ActionFormData();

    resultForm.title(
        `Search: ${keyword}`
    );

    if (
        listings.length === 0
    ) {
        resultForm.body(
            "No item found."
        );
    }

    for (
        const listing
        of listings
    ) {
        const item =
            listing.item;

        const name =
            item.nameTag ||
            item.typeId.replace(
                "minecraft:",
                ""
            );

        resultForm.button(
            `${name}\n§a$${formatPrice(
                listing.price
            )}`
        );
    }

    const result =
        await resultForm.show(
            player
        );

    if (
        result.canceled
    ) {
        return;
    }

    const listing =
        listings[
            result.selection
        ];

    if (!listing) {
        return;
    }

    openBuyMenu(
        player,
        listing
    );
}
