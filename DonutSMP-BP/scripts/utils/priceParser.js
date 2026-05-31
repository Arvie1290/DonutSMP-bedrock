/**
 * Convert:
 * 10   -> 10
 * 10k  -> 10000
 * 10m  -> 10000000
 * 10b  -> 1000000000
 */

export function parsePrice(input) {
    if (!input) return null;

    const text = String(input)
        .trim()
        .toLowerCase();

    const match = text.match(/^(\d+)([kmb]?)$/);

    if (!match) {
        return null;
    }

    const value = Number(match[1]);
    const suffix = match[2];

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

/**
 * Convert:
 * 10000 -> 10k
 * 10000000 -> 10m
 * 1000000000 -> 1b
 */

export function formatPrice(amount) {
    amount = Number(amount);

    if (amount >= 1_000_000_000) {
        return `${amount / 1_000_000_000}b`;
    }

    if (amount >= 1_000_000) {
        return `${amount / 1_000_000}m`;
    }

    if (amount >= 1_000) {
        return `${amount / 1_000}k`;
    }

    return String(amount);
}
