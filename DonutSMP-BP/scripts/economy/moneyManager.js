import { world } from "@minecraft/server";

const OBJECTIVE = "money";

function getObjective() {
    return world.scoreboard.getObjective(OBJECTIVE);
}

export function getMoney(player) {
    const objective = getObjective();

    if (!objective) {
        throw new Error(
            `[DonutSMP] Scoreboard '${OBJECTIVE}' not found.`
        );
    }

    try {
        return objective.getScore(player) ?? 0;
    } catch {
        return 0;
    }
}

export function setMoney(player, amount) {
    const objective = getObjective();

    if (!objective) {
        throw new Error(
            `[DonutSMP] Scoreboard '${OBJECTIVE}' not found.`
        );
    }

    objective.setScore(player, amount);
}

export function addMoney(player, amount) {
    const current = getMoney(player);

    setMoney(
        player,
        current + amount
    );
}

export function removeMoney(player, amount) {
    const current = getMoney(player);

    setMoney(
        player,
        Math.max(
            0,
            current - amount
        )
    );
}

export function hasMoney(player, amount) {
    return getMoney(player) >= amount;
}
