import express from "express"
import fileUpload from "express-fileupload"
import cors from "cors"
import router from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes.js"
import subjectRouter from "./routes/subjectRoutes.js"
const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(cors())
app.use(cookieParser())

app.use(userRouter)
// app.use(subjectRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
