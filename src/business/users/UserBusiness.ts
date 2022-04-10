import { CustomError } from "../../errors/CustomError";
import { UserModel, stringToUserRole } from "../../model/users/User.model";
import { UserDatabase } from "../../data/UserDatabase";
import { HashGenerator } from "../../services/hashGenerator";
import { IdGenerator } from "../../services/idGenerator";
import { TokenGenerator } from "../../services/tokenGenerator";
import { UsersBusinessInterface } from "./Users.Business.Interface";
import { toAuthenticationData } from "../../types";
import { inputSignUpDTO, updateUserDTO, userDTI } from "../../model/users/User.Interfaces"

export class UserBusiness implements UsersBusinessInterface {
  
  constructor(
      private idGenerator: IdGenerator,
      private hashGenerator: HashGenerator,
      private tokenGenerator: TokenGenerator,
      private userDatabase: UserDatabase
    ) { }
  signup = async (user: inputSignUpDTO ) => {
    try {
      if (!user.name || !user.email || !user.password || !user.role) {
        throw new CustomError(422, "Missing input");
      }

      if (user.email.indexOf("@") === -1) {
        throw new CustomError(422, "Invalid email");
      }
      if(await this.userDatabase.getUserByEmail(user.email)){
        throw new CustomError(409, "Email already in use");
      }

      if (user.password.length < 6) {
        throw new CustomError(422, "Invalid password");
      }
      const id = this.idGenerator.generate(); 

      const cypherPassword = await this.hashGenerator.hash(user.password);
      
      
      await this.userDatabase.createUser(
        new UserModel(id, user.name, user.email, 
                      cypherPassword, stringToUserRole(user.role),
                      0, new Date(), id, new Date(), new Date())
      ); 
      
      
      const accessToken = 
        this.tokenGenerator
          .generateToken(toAuthenticationData(id, stringToUserRole(user.role)));
      return { accessToken };
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }

  }
  insert = async (user: inputSignUpDTO, token: string): Promise<UserModel> => {
    if (!user.name || !user.email || !user.password || !user.role) {
      throw new CustomError(422, "Missing input");
    }

    if (user.email.indexOf("@") === -1) {
      throw new CustomError(422, "Invalid email");
    }
    if(await this.userDatabase.getUserByEmail(user.email)){
      throw new CustomError(409, "Email already in use");
    }

    if (user.password.length < 6) {
      throw new CustomError(422, "Invalid password");
    }
    const id = this.idGenerator.generate(); 

    const cypherPassword = await this.hashGenerator.hash(user.password);
    const newUser = new UserModel(id, user.name, user.email, 
                      cypherPassword, stringToUserRole(user.role),
                      0, new Date(), id, new Date(), new Date())
    
    await this.userDatabase.createUser(newUser);
    return newUser

  };

  update = async (user: updateUserDTO, id: string, token: string): Promise<boolean> => {
    try {
      if((!user.name) || (!user.role) || !id){
        throw new CustomError(422, "Missing input");
      };
      const userUp = await this.userDatabase.getUserById2(id);
      if(!userUp){
        throw new CustomError(404, "'id' not found!")
      }
      const accessToken = this.tokenGenerator.getTokenData(token);
      if(!accessToken){
        throw new CustomError(401, "Token Unauthorized");
      }
      if((accessToken.role !== "ADMIN") || !(userUp.id === id)){
        throw new CustomError(401, "You are not authorized for this action");
      }
      userUp.name = user.name;
      userUp.role = stringToUserRole(user.role);
      if(await this.userDatabase.update(userUp)){
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  delete = async (id: string, token: string): Promise<boolean> => {
    try {
      if(!id){
        throw new CustomError(422, "Missing input");
      };
      const userDel = await this.userDatabase.getUserById2(id);
      if(!userDel){
        throw new CustomError(404, "'id' not found!")
      }
      const accessToken = this.tokenGenerator.getTokenData(token);
      if(!accessToken){
        throw new CustomError(401, "Token Unauthorized");
      }
      if(accessToken.role !== "ADMIN"){
        throw new CustomError(401, "You are not authorized for this action");
      }
      if(await this.userDatabase.delete(id)){
        return true
      } else {
        return false
      };
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  login = async (email: string, password: string) => {

    try {
      if (!email || !password) {
        throw new CustomError(422, "Missing input");
      }

      const user = await this.userDatabase.getUserByEmail(email);

      if (!user) {
        throw new CustomError(401, "Invalid credentials");
      }

      const isPasswordCorrect = await this.hashGenerator.compareHash(
        password,
        user.getPassword()
      );

      if (!isPasswordCorrect) {
        throw new CustomError(401, "Invalid credentials");
      }

      const accessToken = this.tokenGenerator.generateToken(toAuthenticationData(user.getId(), stringToUserRole(user.getRole())));

      return { user, accessToken };
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  
  profile = async (id: string, token: string): Promise<userDTI> => {
    try {
      if(!id){
        throw new CustomError(422, "Missing input");
      }
      const tokenData = this.tokenGenerator.getTokenData(token);
      if(!tokenData){
        throw new CustomError(401, "Token Unauthorized");
      }
      const user = await this.userDatabase.getUserById2(id);
      
      if (!user) {
        throw new CustomError(404, "'id' not found");
      }
      return user
      
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  getAllUsers = async (token: string) => {
    try {
      const tokenData = this.tokenGenerator.getTokenData(token);

      if(!tokenData || (tokenData.role !== "ADMIN")){
        throw new CustomError(422, "You are not authorized for this action!");
      }
      
      const allUsers = await this.userDatabase.getAllUsers();
      
      return allUsers  
    } catch (error) {
      
      throw new CustomError(error.statusCode, error.message);
    }
    
  }
}

export default new UserBusiness(
  new IdGenerator(), 
  new HashGenerator(),
  new TokenGenerator(),
  new UserDatabase()
)