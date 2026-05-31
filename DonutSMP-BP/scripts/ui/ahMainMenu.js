import {
    ActionFormData
} from "@minecraft/server-ui";

import {
    getActiveListings
} from "../auction/listingManager.js";

import {
    getPageItems,
    getMaxPage,
    normalizePage
} from "../auction/pageManager.js";

import {
    formatPrice
} from "../utils/priceParser.js";

export async function openAHMenu(
    player,
    page = 1
) {
    const listings =
        getActiveListings();

    page =
        normalizePage(
            listings,
            page
        );

    const maxPage =
        getMaxPage(
            listings
        );

    const pageItems =
        getPageItems(
            listings,
            page
        );

    const form =
        new ActionFormData();

    form.title(
        "Auction House"
    );

    form.button(
        "§bYour Items"
    );

    form.button(
        "§eSearch Item"
    );

    form.button(
        "§aRefresh"
    );

    form.button(
        `§7Page: ${page}/${maxPage}`
    );

    for (
        const listing
        of pageItems
    ) {
        const item =
            listing.item;

        const name =
            item.nameTag ||
            item.typeId.replace(
                "minecraft:",
                ""
            );

        form.button(
            `§f${name}\n§a$${formatPrice(
                listing.price
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

    const selection =
        result.selection;

    switch (
        selection
    ) {
        case 0:
            player.sendMessage(
                "TODO: Your Items Menu"
            );
            return;

        case 1:
            player.sendMessage(
                "TODO: Search Menu"
            );
            return;

        case 2:
            openAHMenu(
                player,
                page
            );
            return;

        case 3:
            openAHMenu(
                player,
                page + 1
            );
            return;
    }

    const listing =
        pageItems[
            selection - 4
        ];

    if (!listing) {
        return;
    }

    player.sendMessage(
        `Selected: ${listing.id}`
    );

    /*
    nanti:
    openBuyMenu(
        player,
        listing
    );
    */
}
