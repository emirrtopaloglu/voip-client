export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    address: string;
    createdAt: Date | string;
    lastLogin: Date | string;
}