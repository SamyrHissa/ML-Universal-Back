import knex from "knex";
import { productsTableName,
   usersTableName,
   clientsTableName,
   suppliersTableName,
   adsTableName } from "./TableNames";
import dotenv from 'dotenv'

dotenv.config()

const connection = knex({
   client: 'mysql',
   connection: {
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_SCHEMA,
       port: 3306,
       multipleStatements: true
   }
})

export const migration = async () => {
   try {
     await connection.raw(`
         CREATE TABLE IF NOT EXISTS ${productsTableName}(
            id VARCHAR(64) PRIMARY KEY,
            description VARCHAR(255) NOT NULL,
            SKU VARCHAR(255),
            Unit VARCHAR(255),
            Price DECIMAL(15, 4),
            Qty_Min DECIMAL(15, 4),
            Qty_Max DECIMAL(15, 4)
         );

         CREATE TABLE IF NOT EXISTS ${usersTableName}(
            id VARCHAR(64) PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) NOT NULL,
            password VARCHAR(64) NOT NULL,
            role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
         );

         CREATE TABLE IF NOT EXISTS ${clientsTableName}(
            id VARCHAR(64) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            id_MercadoLivre VARCHAR(255),
            email VARCHAR(255),
            CPF VARCHAR(10),
            telephone VARCHAR(255),
            CEP VARCHAR(8),
            address VARCHAR(255),
            number VARCHAR(5),
            complemento VARCHAR(255),
            bairro VARCHAR(50),
            city VARCHAR(50)
         );

         CREATE TABLE IF NOT EXISTS ${suppliersTableName}(
            id VARCHAR(64) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            CPF VARCHAR(10),
            CNPJ VARCHAR(14),
            telephone VARCHAR(255),
            CEP VARCHAR(8),
            address VARCHAR(255),
            number VARCHAR(5),
            complemento VARCHAR(255),
            bairro VARCHAR(50),
            city VARCHAR(50)
         );

         CREATE TABLE IF NOT EXISTS ${adsTableName}(
            GUUID VARCHAR(64) PRIMARY KEY,
            description VARCHAR (255),
            id_product VARCHAR (64) NOT NULL,
            qty DECIMAL (15, 4) NOT NULL,
            price DECIMAL (15, 4) NOT NULL,
            status INTEGER,
            date_status TIMESTAMP,
            id_User VARCHAR(64) NOT NULL,
            date_create TIMESTAMP,
            date_update TIMESTAMP,
            FOREIGN KEY(id_product) REFERENCES ${productsTableName} (id),
            FOREIGN KEY(id_User) REFERENCES ${usersTableName} (id)
         );
         
      `)
      console.log("Tabela criada!")

      // pokemons.forEach((pokemon: any)=>{
      //    pokemon.RowId = pokemon.Row
      //    delete pokemon.Row 
      // }) 
      // console.log(pokemons[0])
      // await connection(pokemonTableName).insert(pokemons)
      
   } catch (error) {
      console.log(error);
   } finally {
      connection.destroy()
   }
}

migration()
