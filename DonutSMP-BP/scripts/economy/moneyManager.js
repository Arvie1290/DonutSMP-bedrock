import { world } from "@minecraft/server";

const OBJECTIVE_NAME = "money";

function getObjective() {
    let objective = world.scoreboard.getObjective(OBJECTIVE_NAME);

    if (!objective) {
        try {
            objective = world.scoreboard.addObjective(
                OBJECTIVE_NAME,
                "Money"
            );
        } catch {
            objective = world.scoreboard.getObjective(OBJECTIVE_NAME);
        }
    }

    return objective;
}

export function getMoney(player) {
    const objective = getObjective();
    if (!objective) return 0;

    try {
        return objective.getScore(player) ?? 0;
    } catch {
        return 0;
    }
}

export function setMoney(player, amount) {
    const objective = getObjective();
    if (!objective) return false;

    const value = Math.max(0, Math.floor(Number(amount) || 0));

    try {
        objective.setScore(player, value);
        return true;
    } catch {
        return false;
    }
}

export function addMoney(player, amount) {
    const current = getMoney(player);
    return setMoney(player, current + (Math.floor(Number(amount) || 0)));
}

export function removeMoney(player, amount) {
    const current = getMoney(player);
    return setMoney(player, Math.max(0, current - Math.floor(Number(amount) || 0)));
}

export function hasMoney(player, amount) {
    return getMoney(player) >= Math.floor(Number(amount) || 0);
}

export function ensureMoneyObjective() {
    return getObjective() !== undefined;
}
