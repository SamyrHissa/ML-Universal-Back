import { Request, Response } from "express";
import { UserBusiness } from "../../business/users/UserBusiness";
import { UserDatabase } from "../../data/UserDatabase";
import { updateUserDTO } from "../../model/users/User.Interfaces";
import { stringToUserRole } from "../../model/users/User.model";
import { HashGenerator } from "../../services/hashGenerator";
import { IdGenerator } from "../../services/idGenerator";
import { TokenGenerator } from "../../services/tokenGenerator";

export default class UserController {
  private userBusiness : UserBusiness;
  constructor(){
    
    this.userBusiness = new UserBusiness(
      new IdGenerator(),
      new HashGenerator(),
      new TokenGenerator(),
      new UserDatabase()
    )
  }

  signup = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;
      const newUser = {
        "name": name,
        "email": email,
        "password": password,
        "role": stringToUserRole(role)
      }
      
      const result = await this.userBusiness.signup(newUser);
      
      res.status(200).send(result);
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }
  insert = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;
      const newUser = {
        "name": name,
        "email": email,
        "password": password,
        "role": stringToUserRole(role)
      }
      const token: string = String(req.headers.token);
      
      const result = await this.userBusiness.insert(newUser, token);
      
      res.status(200).send(result);
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }
  update = async (req: Request, res: Response) => {
    try {
      const { name, password, role } = req.body;
      const id = req.params.id;
      const token: string = String(req.headers.authorization);
      const user: updateUserDTO = {
        name,
        password,
        role
      }
      if(await this.userBusiness.update(user, id, token)){
        res.status(200).send("Data Updated!")
      } else {
          res.status(412).send("Data not Updated!")
      };
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const token: string = String(req.headers.authorization);
      if(await this.userBusiness.delete(id, token)){
        res.status(200).send("Data Updated!")
      } else {
          res.status(412).send("Data not Updated!")
      }
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.userBusiness.login(email, password);
      res.status(200).send(result);
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }
  profile = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const token: string = String(req.headers.authorization);
      const result = await this.userBusiness.profile(id, token);
      res.status(200).send(result)
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }
  getAllUsers = async (req:Request, res: Response) => {
    try {
      const token: string = String(req.headers.authorization);
      const result = await this.userBusiness.getAllUsers(token);
      
      res.status(200).send(result);
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }

}
