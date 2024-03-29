import { USER_ROLES } from "../../src/model/users/User.model";
import { AuthenticationData } from "../../src/services/tokenGenerator";

export class TokenGeneratorMock {
  public generate = (input: AuthenticationData): string => {
    return "token_mock"
  }

  public verify = jest.fn ((token: string) => {
    
    
    switch(token){
      case "token_normal":
        return {
          id: "id_mock",
          role: USER_ROLES.NORMAL
        }
      case "token_admin":
        return {
          id: "id_mock",
          role: USER_ROLES.ADMIN
        }
      default:
        return undefined
    }
    
  })
}