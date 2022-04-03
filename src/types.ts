import { USER_ROLES } from "./model/users/User.model";

export interface authenticationData{
    id: string,
    role: USER_ROLES
  }

export const toAuthenticationData = (id: string, role: USER_ROLES): authenticationData => {
    return {
      id: id,
      role: role
    }
 };

//   export enum USER_ROLES {
//     NORMAL = "NORMAL",
//     ADMIN = "ADMIN"
//   }

// export interface userInfo  {
//     id: string
//     name: string
//     email: string
//     password: string
//     role: USER_ROLES
//  }

//  export const userTableName = "cookenu_Users"
//  export const recipeTableName = "cookenu_Recipe"