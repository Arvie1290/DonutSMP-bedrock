import { world } from "@minecraft/server";

const DATABASE_KEY = "donutsmp_auction_house";

function loadDatabase() {
    try {
        const raw =
            world.getDynamicProperty(
                DATABASE_KEY
            );

        if (!raw) {
            return [];
        }

        return JSON.parse(raw);
    }
    catch {
        return [];
    }
}

function saveDatabase(data) {
    world.setDynamicProperty(
        DATABASE_KEY,
        JSON.stringify(data)
    );
}

export function getListings() {
    return loadDatabase();
}

export function getListing(id) {
    return loadDatabase().find(
        listing =>
            listing.id === id
    );
}

export function addListing(listing) {
    const data = loadDatabase();

    data.push(listing);

    saveDatabase(data);
}

export function removeListing(id) {
    const data = loadDatabase();

    const filtered =
        data.filter(
            listing =>
                listing.id !== id
        );

    saveDatabase(filtered);
}

export function updateListing(
    id,
    updates
) {
    const data = loadDatabase();

    const index =
        data.findIndex(
            listing =>
                listing.id === id
        );

    if (index === -1) {
        return false;
    }

    data[index] = {
        ...data[index],
        ...updates
    };

    saveDatabase(data);

    return true;
}
