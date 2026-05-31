export function formatRemainingTime(
    expiredAt
) {
    const now =
        Date.now();

    const remain =
        Math.max(
            0,
            expiredAt - now
        );

    const hours =
        Math.floor(
            remain /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (
                remain %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );

    return `${hours}h ${minutes}m`;
}

export function isExpired(
    expiredAt
) {
    return (
        Date.now() >=
        expiredAt
    );
}

export function createExpireTime(
    hours = 48
) {
    return (
        Date.now() +
        (
            hours *
            60 *
            60 *
            1000
        )
    );
}
