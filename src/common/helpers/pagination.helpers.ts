export const getSkip = (page: number, limit: number): number => {
    if (page < 1) {
        page = 1;
    }
    if (limit < 1) {
        limit = 10;
    }
    return (page - 1) * limit;
}