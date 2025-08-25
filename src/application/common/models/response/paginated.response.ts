export class PaginatedResponse<T> {
    constructor(
        public readonly records: T[], 
        public readonly page: number, 
        public readonly size: number, 
        public readonly totalSize: number
    ) { }
}