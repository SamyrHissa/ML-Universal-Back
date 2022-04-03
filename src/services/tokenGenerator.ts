import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticationData } from "../types";

dotenv.config();

export class TokenGenerator {
  private static expiresIn: number = 1200;

  public generate = (input: AuthenticationData): string => {
    const newToken = jwt.sign(
      {
        id: input.id,
        role: input.role,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: TokenGenerator.expiresIn,
      }
    );
    return newToken;
  };

  public generateToken = (
    payload: authenticationData
  ): string => {

    const token = jwt.sign(
      payload,
      process.env.JWT_KEY! as string,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN! }
    )

    return token
  }

  public verify(token: string) {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = { id: payload.id, role: payload.role };
    return result;
  }

  public getTokenData = (
    token: string
  ): authenticationData | null => {
    try {

      const tokenData = jwt.verify(
        token,
        process.env.JWT_KEY! as string
      ) as authenticationData // jwt.JwtPayload

      return {
        id: tokenData.id,
        role: tokenData.role
      }

    } catch (error) {
      return null
    }
  }
}

export interface AuthenticationData {
  id: string;
  role: string;
}

export default new TokenGenerator()