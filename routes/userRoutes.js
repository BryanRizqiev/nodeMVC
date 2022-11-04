import express from "express"
import UserController from "../controller/UserController.js"
import verifyToken from "../middleware/verifyToken.js"

const userRouter = express.Router()

userRouter.get("/getDns", UserController.getDns)
userRouter.get("/", UserController.coba)
userRouter.post("/register", UserController.register)
userRouter.post("/login", UserController.login)
userRouter.get("/getDatas", verifyToken, UserController.getDatas)
userRouter.post("/index", verifyToken, UserController.index)
userRouter.post("/refresh", UserController.refreshToken)
userRouter.post("/logout", verifyToken, UserController.logout)

export default userRouter