import {
    addListing,
    getListings,
    getListing,
    removeListing,
    updateListing
} from "../database/ahDatabase.js";

export function createListing({
    seller,
    price,
    item
}) {
    const id =
        `ah_${Date.now()}_${Math.floor(
            Math.random() * 999999
        )}`;

    const listing = {
        id,

        seller,

        price,

        item,

        sold: false,

        createdAt:
            Date.now(),

        expiredAt:
            Date.now() +
            (48 * 60 * 60 * 1000)
    };

    addListing(
        listing
    );

    return listing;
}

export function deleteListing(
    listingId
) {
    removeListing(
        listingId
    );
}

export function getAllListings() {
    return getListings();
}

export function findListing(
    listingId
) {
    return getListing(
        listingId
    );
}

export function markAsSold(
    listingId
) {
    updateListing(
        listingId,
        {
            sold: true
        }
    );
}

export function getPlayerListings(
    playerName
) {
    return getListings()
        .filter(
            listing =>
                listing.seller ===
