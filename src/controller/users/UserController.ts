import { Request, Response } from "express";
import { UserBusiness } from "../../business/users/UserBusiness";
import { UserDatabase } from "../../data/UserDatabase";
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
      const { name, role, email, password } = req.body;
      const result = await this.userBusiness.signup(name, email, password, role);
      res.status(200).send(result);
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }

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
