import { OMUser } from './om-user';

export namespace OMAuth {
    export interface LoginRequest {
        email: string;
        password: string;
    }
    export interface LoginResponse {

        expires_in: number; // 4500
        message: string; //  "successfully logged in"
        status: string; // "success"
        token: string; // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE4MjgyMTYsImlhdCI6MTY0MTgyMzcxNiwic3ViIjoiYjgxZjEwMWUtNTg0Zi00NjNjLWE4MTItZDU5ODY2NzhiZWM3In0.igoiLJc4rrlmT_OwdPVl3TcM1taEN5wXiCIpJCC2OUw"
        user: OMUser;
        token_type: string

    }
}