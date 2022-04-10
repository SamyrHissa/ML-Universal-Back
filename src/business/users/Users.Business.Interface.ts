import { UserModel } 
    from "../../model/users/User.model";
import { inputSignUpDTO, updateUserDTO, userDTI }
    from "../../model/users/User.Interfaces";

export interface UsersBusinessInterface {
    signup(user: inputSignUpDTO): Promise<{}>;
    insert(user: inputSignUpDTO, token: string): Promise<UserModel>;
    update(user: updateUserDTO, id: string, token: string): Promise<boolean>;
    delete(id: string, token: string): Promise<boolean>;
    login(email: string, password: string): Promise<{}>;
    profile(id:string, token: string): Promise<userDTI>;
    getAllUsers(token: string): Promise<UserModel[]>;
}