export interface OMBaseResponse<T> {
    payload: T;
    status: string; // "string",
    expires_in: number; // 0
    expires_at: number; // 0
    status_code: number; // 0
    count: number | null;
    page: number | null;
    message: string;
}