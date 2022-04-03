import { USER_ROLES } from "./User.model"

export interface inputSignUpDTO {
    "name": string,
    "email": string,
    "password": string,
    "role": USER_ROLES
 }
 export interface updateUserDTO {
    "name": string,
    "password": string,
    "role": string
 }
 export interface userDTI {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    status: number,
    date_Status: Date,
    id_User: string,
    date_Create: Date,
    date_Update: Date
 }