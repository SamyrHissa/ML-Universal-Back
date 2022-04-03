import BaseDataBase from "./BaseDatabase";
import { UserModel } from "../model/users/User.model";
import { usersTableName } from "./TableNames";
import { userDTI } from "../model/users/User.Interfaces";
import { dateDateToStr } from "../utils/functions";

export class UserDatabase extends BaseDataBase {

   protected tableName: string = usersTableName;

   // private toModel(dbModel?: any): UserModel | undefined {
   //    return (
   //       dbModel &&
   //       new UserModel(
   //          dbModel.id,
   //          dbModel.name,
   //          dbModel.email,
   //          dbModel.password,
   //          dbModel.role,
   //          dbModel.status,
   //          dbModel.date_Status,
   //          dbModel.id_User,
   //          dbModel.date_Create,
   //          dbModel.date_Update
   //       )
   //    );
   // }

   public async createUser(user: UserModel): Promise<void> {
      try {
         
         const command = `
         INSERT INTO ${this.tableName} (id, name, email, password, role,
            status, date_status, id_user, date_create, date_update
            )
         VALUES (
         '${user.getId()}', 
         '${user.getName()}', 
         '${user.getEmail()}',
         '${user.getPassword()}', 
         '${user.getRole()}',
         '${user.getStatus()}',
         '${dateDateToStr(user.getDate_Status())}',
         '${user.getId_User()}',
         '${dateDateToStr(user.getDate_Create())}',
         '${dateDateToStr(user.getDate_Update())}'
         )`;
         await BaseDataBase.connection.raw(command
         );
      } catch (error) {
         throw new Error(error.sqlMessage || error.message)
      }
   }
   async update(user: userDTI): Promise<void> {
      try {
         await BaseDataBase.connection(this.tableName)
            .update(user)
            .where(`id`, user.id)
      } catch (error) {
          throw new Error(error.sqlMessage || error.message);
      }
   }
  async delete(id: string) {
      try {
         await BaseDataBase.connection.raw(`
         DELETE FROM ${this.tableName} WHERE id = "${id}"
         `)
      } catch (error) {
         throw new Error(error.sqlMessage || error.message);
      }
   }

   public async getUserByEmail(email: string): Promise<UserModel | undefined> {
      try {
        const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName} WHERE email = '${email}'
         `);
         if(!result[0][0]){
            return undefined
         }
        return UserModel.toUserModel(result[0][0]);
      } catch (error) {
        throw new Error(error.sqlMessage || error.message);
      }
   }

   public async getUserById(id: string): Promise<UserModel | undefined> {
      try {
        const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName} WHERE id = '${id}'
         `);
        return UserModel.toUserModel(result[0][0]);
      } catch (error) {
        throw new Error(error.sqlMessage || error.message);
      }
   }

   public async getUserById2(id: string): Promise<userDTI | undefined> {
      try {
        const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName} WHERE id = '${id}'
         `);
        return (result[0][0]);
      } catch (error) {
        throw new Error(error.sqlMessage || error.message);
      }
   }

   public async getAllUsers(): Promise<UserModel[]> {
      try {
         
         const result = await BaseDataBase.connection.raw(`
               SELECT * from ${this.tableName}
            `);

         return result[0].map((res: any) => {
            return UserModel.toUserModel(res);
         });
         } catch (error) {
         throw new Error(error.sqlMessage || error.message);
         }
   }
}