import {
    system
} from "@minecraft/server";

import {
    getExpiredListings,
    deleteListing
} from "./listingManager.js";

import {
    addExpiredItem
} from "../database/playerDatabase.js";

const CHECK_INTERVAL =
    20 * 60;
/*
1 menit

20 tick = 1 detik
20 * 60 = 60 detik
*/

function processExpiredListings() {
    const expired =
        getExpiredListings();

    if (
        expired.length === 0
    ) {
        return;
    }

    for (
        const listing
        of expired
    ) {
        try {
            addExpiredItem(
                listing.seller,
                listing.item
            );

            deleteListing(
                listing.id
            );
        }
        catch (error) {
            console.warn(
                `[DonutSMP] Failed to expire listing ${listing.id}`
            );
        }
    }
}

system.runInterval(
    processExpiredListings,
    CHECK_INTERVAL
);
