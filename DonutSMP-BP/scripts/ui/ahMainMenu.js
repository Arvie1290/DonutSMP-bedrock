import { ActionFormData } from "@minecraft/server-ui";
import { getActiveListings } from "../auction/listingManager.js";
import { getPageItems, getMaxPage, normalizePage } from "../auction/pageManager.js";
import { formatPrice } from "../utils/priceParser.js";
import { openYourItemsMenu } from "./ahYourItemsMenu.js";
import { openSearchMenu } from "./ahSearchMenu.js";
import { openBuyMenu } from "./ahBuyMenu.js";

export async function openAHMenu(player, page = 1) {
    const listings = getActiveListings();

    page = normalizePage(listings, page);
    const maxPage = getMaxPage(listings);
    const pageItems = getPageItems(listings, page);

    const form = new ActionFormData();
    form.title("Auction House");

    form.button("§bYour item");
    form.button("§eSearch item");
    form.button("§aRefresh");
    form.button(`§7Page: ${page}/${maxPage}`);

    for (const listing of pageItems) {
        const item = listing.item;
        const name = item?.nameTag?.trim() || item?.typeId?.replace("minecraft:", "") || "Unknown";
        form.button(`§f${name}\n§a$${formatPrice(listing.price)}`);
    }

    const result = await form.show(player);
    if (result.canceled) return;

    const selection = result.selection;

    if (selection === 0) {
        await openYourItemsMenu(player);
        return;
    }

    if (selection === 1) {
        await openSearchMenu(player);
        return;
    }

    if (selection === 2) {
        await openAHMenu(player, page);
        return;
    }

    if (selection === 3) {
        const nextPage = page >= maxPage ? 1 : page + 1;
        await openAHMenu(player, nextPage);
        return;
    }

    const listing = pageItems[selection - 4];
    if (!listing) return;

    await openBuyMenu(player, listing);
}
