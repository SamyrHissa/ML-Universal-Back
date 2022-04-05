import express from "express";
import UserController from "../controller/users/UserController";

export const userRouter = express.Router();
const userController = new UserController();
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.delete);
userRouter.get("/:id", userController.profile);
userRouter.get("/getAll", userController.getAllUsers);
