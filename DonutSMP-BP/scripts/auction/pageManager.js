const ITEMS_PER_PAGE = 6;

export function getMaxPage(
    listings
) {
    if (
        !listings ||
        listings.length === 0
    ) {
        return 1;
    }

    return Math.ceil(
        listings.length /
        ITEMS_PER_PAGE
    );
}

export function getPageItems(
    listings,
    page = 1
) {
    const start =
        (page - 1) *
        ITEMS_PER_PAGE;

    const end =
        start +
        ITEMS_PER_PAGE;

    return listings.slice(
        start,
        end
    );
}

export function isValidPage(
    listings,
    page
) {
    return (
        page >= 1 &&
        page <=
        getMaxPage(
            listings
        )
    );
}

export function normalizePage(
    listings,
    page
) {
    const maxPage =
        getMaxPage(
            listings
        );

    if (page < 1) {
        return 1;
    }

    if (page > maxPage) {
        return maxPage;
    }

    return page;
}
