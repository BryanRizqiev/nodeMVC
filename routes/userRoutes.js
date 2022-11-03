import express from "express"
import UserController from "../controller/UserController.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/getDns", UserController.getDns)
router.get("/", UserController.coba)
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/getDatas", verifyToken, UserController.getDatas)
router.post("/index", verifyToken, UserController.index)
router.post("/refresh", UserController.refreshToken)
router.post("/logout", verifyToken, UserController.logout)

export default router