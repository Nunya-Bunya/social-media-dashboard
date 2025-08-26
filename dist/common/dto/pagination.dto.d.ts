export declare class PaginationDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    status?: string;
    type?: string;
    goal?: string;
    clientId?: string;
    brandId?: string;
}
export declare class PaginatedResponseDto<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
