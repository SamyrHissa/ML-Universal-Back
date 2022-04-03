import { UserModel } 
    from "../../model/users/User.model";
import { inputSignUpDTO, updateUserDTO }
    from "../../model/users/User.Interfaces";

export interface UsersBusinessInterface {
    signup(user: inputSignUpDTO): Promise<{}>;
    update(user: updateUserDTO, id: string, token: string): Promise<void>;
    delete(id: string, token: string): Promise<void>;
    login(email: string, password: string): Promise<{}>;
    profile(id:string, token: string): Promise<UserModel>;
    getAllUsers(token: string): Promise<UserModel[]>;
}