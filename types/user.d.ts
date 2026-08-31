export interface CreateUserType {
    firstname: string;
    lastname: string;
    email: string;
    instituition: string;
    password: string;
    terms: boolean;
}

export interface LoginUserType {
    email: string;
    password: string;
}

export interface UserType {
    firstname: string;
    lastname: string;
    email: string;
    instituition: string;
}