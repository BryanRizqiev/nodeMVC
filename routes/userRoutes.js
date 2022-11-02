import express from "express"
import UserController from "../controller/UserController.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/index", verifyToken, UserController.index)
router.post("/logout", verifyToken, UserController.logout)
router.post("/refresh", UserController.refreshToken)
router.get("/", UserController.coba)

export default router