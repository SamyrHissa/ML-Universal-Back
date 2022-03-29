import { UserBusiness } from "../src/business/users/UserBusiness";
import { UserDatabase } from "../src/data/UserDatabase";
import { TokenGenerator } from "../src/services/tokenGenerator";
import { HashGeneratorMock } from "./mocks/hashGeneratorMock";
import { IdGeneratorMock } from "./mocks/idGeneratorMock";
import { TokenGeneratorMock } from "./mocks/tokenGeneratorMock";
import { UserDatabaseMock } from "./mocks/userDatabaseMock";

const userBusinessMock = new UserBusiness(
  new IdGeneratorMock(),
  new HashGeneratorMock(),
  new TokenGeneratorMock() as TokenGenerator,
  new UserDatabaseMock() as UserDatabase
)

describe("Testando o signup", () => {
  test("Deve retornar erro quando o nome está vazio", async () => {
    expect.assertions(2)
    try {
      await userBusinessMock.signup("", "bruno@bruno.com", "123456", "normal")
    } catch (error) {
      expect(error.message).toEqual("Missing input")
      expect(error.statusCode).toBe(422)
    }
  })

  test("Deve retornar um erro quando o email é inválido (não tem arroba)", async () => {
    expect.assertions(2)
    try {
      await userBusinessMock.signup("Bruno", "bruno.bruno.com", "123456", "normal")
    } catch (error) {
      expect(error.message).toEqual("Invalid email");
      expect(error.statusCode).toBe(422)
    }
  })

  test("Deve retornar erro quando receber uma senha com 5 ou menos caracteres", async () => {
    expect.assertions(2);
    try {
      await userBusinessMock.signup("Bruno", "bruno@bruno.com", "12345", "normal")
    } catch (error) {
      expect(error.message).toEqual("Invalid password");
      expect(error.statusCode).toBe(422)
    }
  })

  test("Deve retornar erro quando receber uma role não existente", async () => {
    expect.assertions(2);
    try {
      await userBusinessMock.signup("Bruno", "bruno@bruno.com", "123456", "guest")
    } catch (error) {
      expect(error.message).toEqual("Invalid user role")
      expect(error.statusCode).toBe(422);
    }
  })

  test("Sucesso no cadastro", async () => {
    expect.assertions(1)
    try {
      const { accessToken } = await userBusinessMock.signup(
        "Bruno",
        "bruno@bruno.com",
        "123456",
        "NORMAL"
      );

      expect(accessToken).toEqual("token_mock");

    } catch (error) {
      console.log(error)
    }
    
  })
})

describe("Testando o login", () => {
  test("Deve retornar erro quando o email fornecido não existe", async () => {
    expect.assertions(2)
    try {
      await userBusinessMock.login("email@email.com", "123456")
    } catch (error) {
      expect(error.message).toEqual("Invalid credentials")
      expect(error.statusCode).toBe(401)
    }
  })

  test("Deve retornar erro quando a senha está errada", async () => {
    expect.assertions(2)
    try {
      await userBusinessMock.login("user1@gmail.com", "123456");
    } catch (error) {
      expect(error.message).toEqual("Invalid credentials")
      expect(error.statusCode).toBe(401)
    }
  })

  test("Sucesso no login e verificação de token de acesso", async () => {
    expect.assertions(1)
    try {
      const { accessToken } = await userBusinessMock.login(
        "user1@gmail.com",
        "user1password"
      );

      expect(accessToken).toEqual("token_mock")
    } catch (error) {
      console.log(error)
    }
  })
})

describe("Teste de profile", ()=>{
  test("Erro de usuário não existente", async () => {
    expect.assertions(2)
    try {
      await userBusinessMock.profile("id_user_inexist");
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toEqual("Invalid credentials")
    }
  })
  test("Resposta de sucesso", async () => {
    expect.assertions(1)
    try {
      const profile = await userBusinessMock.profile("id_user_1")

      expect(profile).toContain({
        "id": "id_user_1",
        "name": "user1",
        "email": "user1@gmail.com",
        "role": "NORMAL"
      })
    } catch (error) {
      console.log(error)
    }
  })
})

describe("Testes do getAllUsers", ()=>{
  test("Erro de não autorizado", async ()=>{
    expect.assertions(2)
    try {
      await userBusinessMock.getAllUsers("token_normal")
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toEqual("Token Unauthorized")
    }
  });
  test("Resposta de sucesso", async ()=>{
    expect.assertions(1)
    try {
      await  userBusinessMock.getAllUsers("token_admin")
      expect(new TokenGeneratorMock().verify).toHaveBeenCalled()
      expect(new UserDatabaseMock().getAllUsers).toHaveBeenCalled()
    } catch (error) {
      
    }
  })
})

//npm list -g --depth 0
