import { User, USER_ROLES } from "../../src/model/users/User.model"

export const userNormalMock = new User(
  "id_user_1",
  "user1",
  "user1@gmail.com",
  "user1password",
  USER_ROLES.NORMAL
)

export const userAdminMock = new User(
  "id_user_2",
  "user2",
  "user2@gmail.com",
  "user2password",
  USER_ROLES.ADMIN
);