// scripts/ui/ahBuyMenu.js
import { MessageFormData } from "@minecraft/server-ui";
import { deserializeItem } from "../utils/itemSerializer.js";
import { hasMoney, removeMoney } from "../economy/moneyManager.js";
import { addClaimMoney } from "../database/playerDatabase.js";
import { deleteListing } from "../auction/listingManager.js";
import { formatPrice } from "../utils/priceParser.js";
import { formatRemainingTime } from "../utils/timeUtils.js";
import { openAHMenu } from "./ahMainMenu.js";

export async function openBuyMenu(player, listing) {
    if (!listing || listing.sold) {
        openAHMenu(player, 1);
        return;
    }

    const form = new MessageFormData()
        .title("Confirm Purchase")
        .body(
            `Seller: ${listing.seller}\n` +
            `Bought money: ${formatPrice(listing.price)}\n` +
            `Expired: ${formatRemainingTime(listing.expiredAt)}`
        )
        .button1("Buy")
        .button2("Cancel");

    const result = await form.show(player);

    if (result.canceled) {
        openAHMenu(player, 1);
        return;
    }

    if (result.selection === 1) {
        openAHMenu(player, 1);
        return;
    }

    if (!hasMoney(player, listing.price)) {
        player.sendMessage("§cNot enough money.");
        openAHMenu(player, 1);
        return;
    }

    const item = deserializeItem(listing.item);
    if (!item) {
        player.sendMessage("§cItem data is invalid.");
        openAHMenu(player, 1);
        return;
    }

    const inventory = player.getComponent("minecraft:inventory");
    const container = inventory?.container;

    if (!container) {
        player.sendMessage("§cInventory unavailable.");
        openAHMenu(player, 1);
        return;
    }

    const remainder = container.addItem(item);

    if (remainder) {
        player.sendMessage("§cInventory full.");
        openAHMenu(player, 1);
        return;
    }

    removeMoney(player, listing.price);
    addClaimMoney(listing.seller, listing.price);
    deleteListing(listing.id);

    player.sendMessage(
        `§i[§1AH§i]: Successful Bought ${item.nameTag?.trim() || item.typeId} ${item.amount}!`
    );
}
