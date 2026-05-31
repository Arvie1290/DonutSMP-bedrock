import {
    addListing,
    getListings,
    getListing,
    removeListing,
    updateListing
} from "../database/ahDatabase.js";

import {
    formatRemainingTime,
    isExpired
} from "../utils/timeUtils.js";

/**
 * Bikin listing baru.
 */
export function createListing({
    seller,
    price,
    item
}) {
    const id = `ah_${Date.now()}_${Math.floor(Math.random() * 999999)}`;

    const listing = {
        id,
        seller,
        price: Math.floor(Number(price) || 0),
        item,
        sold: false,
        createdAt: Date.now(),
        expiredAt: Date.now() + (48 * 60 * 60 * 1000)
    };

    addListing(listing);
    return listing;
}

export function getAllListings() {
    return getListings();
}

export function findListing(listingId) {
    return getListing(listingId);
}

export function deleteListing(listingId) {
    removeListing(listingId);
}

export function markAsSold(listingId) {
    return updateListing(listingId, {
        sold: true,
        soldAt: Date.now()
    });
}

export function updateListingData(listingId, updates) {
    return updateListing(listingId, updates);
}

export function getActiveListings() {
    return getListings().filter(listing => !listing.sold && !isExpired(listing.expiredAt));
}

export function getExpiredListings() {
    return getListings().filter(listing => !listing.sold && isExpired(listing.expiredAt));
}

export function getPlayerListings(playerName) {
    return getListings().filter(listing => listing.seller === playerName && !listing.sold);
}

export function getPlayerExpiredListings(playerName) {
    return getListings().filter(listing => listing.seller === playerName && !listing.sold && isExpired(listing.expiredAt));
}

export function searchListings(keyword) {
    const q = String(keyword ?? "").trim().toLowerCase();
    if (!q) return [];

    return getActiveListings().filter(listing => {
        const typeId = String(listing.item?.typeId ?? "").toLowerCase();
        const nameTag = String(listing.item?.nameTag ?? "").toLowerCase();
        const seller = String(listing.seller ?? "").toLowerCase();

        return (
            typeId.includes(q) ||
            nameTag.includes(q) ||
            seller.includes(q)
        );
    });
}

export function getRemainingTimeText(listing) {
    return formatRemainingTime(listing.expiredAt);
}

export function canBuyListing(listing, buyerName) {
    if (!listing) return false;
    if (listing.sold) return false;
    if (isExpired(listing.expiredAt)) return false;
    if (listing.seller === buyerName) return false;
    return true;
}

export function removeSoldOrExpiredListings() {
    const listings = getListings();
    let changed = false;

    for (const listing of listings) {
        if (listing.sold || isExpired(listing.expiredAt)) {
            removeListing(listing.id);
            changed = true;
        }
    }

    return changed;
}
