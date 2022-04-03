import { CustomError } from "../../errors/CustomError";

export class UserModel {
   constructor(
      private id: string,
      private name: string,
      private email: string,
      private password: string,
      private role: USER_ROLES,
      private status: number,
      private date_Status: Date,
      private id_User: string,
      private date_Create: Date,
      private date_Update: Date
   ) { }

   public getId = (): string => this.id;
   public getName = (): string => this.name;
   public getEmail= (): string => this.email;
   public getPassword = (): string => this.password;
   public getRole = (): USER_ROLES => this.role;
   public getStatus = (): number => this.status;
   public getDate_Status = (): Date => this.date_Status;
   public getId_User = (): string => this.id_User;
   public getDate_Create = (): Date => this.date_Create;
   public getDate_Update = (): Date => this.date_Update;

   public setName = (name: string) => {this.name = name};
   public setPassword = (password: string) => {this.password = password};
   public setRole = (role: USER_ROLES) => {this.role = role};
   public setStatus = (status: number) => {this.status = status};
   public setDate_Status = (value: Date) => {this.date_Status = value};
   public setIdUser = (value: string) => {this.id_User = value};
   public setDate_Update = (value: Date) => {this.date_Update = value};

   static toUserModel(data: any): UserModel {
      return new UserModel(
          data.id, 
          data.name, 
          data.email, 
          data.password,
          data.role,
          data.status,
          data.date_Status,
          data.id_User,
          data.date_Create,
          data.date_Update
          );
   }
}

export const stringToUserRole = (input: string): USER_ROLES => {
   switch (input) {
      case "NORMAL":
         return USER_ROLES.NORMAL;
      case "ADMIN":
         return USER_ROLES.ADMIN;
      default:
         throw new CustomError(422, "Invalid user role");
   }
};

export enum USER_ROLES {
   NORMAL = "NORMAL",
   ADMIN = "ADMIN",
}
export interface inputSignUpDTO {
   "name": string,
   "email": string,
   "password": string,
   "role": USER_ROLES
}
export interface updateUserDTO {
   "name": string,
   "password": string,
   "role": USER_ROLES
}

