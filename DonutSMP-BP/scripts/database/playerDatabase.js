import { world } from "@minecraft/server";

const PREFIX =
    "donutsmp_player_";

function getKey(
    playerName
) {
    return (
        PREFIX +
        playerName
    );
}

function getDefaultData() {
    return {
        expiredItems: [],

        claimMoney: [],

        history: []
    };
}

export function getPlayerData(
    playerName
) {
    try {
        const raw =
            world.getDynamicProperty(
                getKey(
                    playerName
                )
            );

        if (!raw) {
            return getDefaultData();
        }

        return JSON.parse(
            raw
        );
    }
    catch {
        return getDefaultData();
    }
}

export function savePlayerData(
    playerName,
    data
) {
    world.setDynamicProperty(
        getKey(
            playerName
        ),
        JSON.stringify(
            data
        )
    );
}
