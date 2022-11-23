export interface Pagination<T> {
    nextPag: string;
    prevPag: string;
    count:   number;
    results: T[];
}