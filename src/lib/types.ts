 import type{
    Catalogo_personal,
    Areas,
} from '@prisma/client'; 

export type APIResponse<T> = {
    status: 'success' | 'error',
    data?: T,
    jwt?: string,
    error?: unknown
}

export interface LoginResponseData {
    rol: string;
    id: string;
    username: string;
}

export type{
    Catalogo_personal,
    Areas,
}