import {
    world
} from "@minecraft/server";

import {
    parsePrice
} from "../utils/priceParser.js";

import {
    serializeItem
} from "../utils/itemSerializer.js";

import {
    createListing
} from "../auction/listingManager.js";

world.beforeEvents.chatSend.subscribe(
    (event) => {
        const {
            sender,
            message
        } = event;

        if (
            !message.startsWith(
                "/ah sell "
            )
        ) {
            return;
        }

        event.cancel = true;

        const args =
            message.split(" ");

        const priceInput =
            args[2];

        const price =
            parsePrice(
                priceInput
            );

        if (
            price === null ||
            price <= 0
        ) {
            sender.sendMessage(
                "§cInvalid price."
            );

            return;
        }

        const inventory =
            sender.getComponent(
                "minecraft:inventory"
            );

        const container =
            inventory.container;

        const slot =
            sender.selectedSlotIndex;

        const item =
            container.getItem(
                slot
            );

        if (!item) {
            sender.sendMessage(
                "§cHold an item first."
            );

            return;
        }

        const serialized =
            serializeItem(
                item
            );

        createListing({
            seller:
                sender.name,

            price,

            item:
                serialized
        });

        container.setItem(
            slot,
            undefined
        );

        sender.sendMessage(
            `§i[§1AH§i]: Listed ${item.typeId} x${item.amount} for ${priceInput}!`
        );
    }
);
