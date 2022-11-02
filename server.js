import express from "express"
import fileUpload from "express-fileupload"
import cors from "cors"
import router from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(cors())
app.use(cookieParser())

app.use(router)

app.listen(8000, () => {
    console.log(`Server running on port ${8000}`)
})