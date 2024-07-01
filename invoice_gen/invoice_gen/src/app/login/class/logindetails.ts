import { Role } from "src/app/role/class/role";

export class LoginDetails {
    id!: number;
    username: string;
    password: string;
    role: Role;
    active: boolean;
    isLoggedIn: boolean;

    constructor(
       
        username: string,
        password: string,
        role: Role,
        active: boolean,
        isLoggedIn: boolean
    ) {
      
        this.username = username;
        this.password = password;
        this.role = role;
        this.active = active;
        this.isLoggedIn = isLoggedIn;
    }

    getMaskedPassword(): string {
        return this.password ? this.password.replace(/./g, '*') : '';
    }

}