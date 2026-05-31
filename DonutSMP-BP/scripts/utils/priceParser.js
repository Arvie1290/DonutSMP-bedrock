export function parsePrice(input) {
    if (input === undefined || input === null) return null;

    const text = String(input).trim().toLowerCase();
    if (!text) return null;

    const match = text.match(/^(\d+)([kmb]?)$/);
    if (!match) return null;

    const value = Number(match[1]);
    const suffix = match[2];

    if (Number.isNaN(value)) return null;

    switch (suffix) {
        case "k":
            return value * 1_000;
        case "m":
            return value * 1_000_000;
        case "b":
            return value * 1_000_000_000;
        default:
            return value;
    }
}

export function formatPrice(amount) {
    const value = Number(amount);

    if (!Number.isFinite(value) || value < 0) {
        return "0";
    }

    if (value >= 1_000_000_000) {
        const num = value / 1_000_000_000;
        return Number.isInteger(num) ? `${num}b` : `${num.toFixed(2).replace(/\.00$/, "")}b`;
    }

    if (value >= 1_000_000) {
        const num = value / 1_000_000;
        return Number.isInteger(num) ? `${num}m` : `${num.toFixed(2).replace(/\.00$/, "")}m`;
    }

    if (value >= 1_000) {
        const num = value / 1_000;
        return Number.isInteger(num) ? `${num}k` : `${num.toFixed(2).replace(/\.00$/, "")}k`;
    }

    return `${value}`;
}
