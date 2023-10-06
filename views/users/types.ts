export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    company_name: string;
    address: string;
    createdAt: Date | string;
    lastLogin: Date | string;
}