import { User } from "../../model/User";

export interface UsersBusinessInterface {
    signup(name: string, email: string, password: string, role: string): Promise<{}>;
    login(email: string, password: string): Promise<{}>;
    profile(id:string, token: string): Promise<User>;
    getAllUsers(token: string): Promise<User[]>;
}