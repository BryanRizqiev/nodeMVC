import express from "express"
import SubjectController from "../controller/SubjectController.js"

const subjectRouter = express.Router()

subjectRouter.post("/storeSubject", SubjectController.addSubject)

export default subjectRouter