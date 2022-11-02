import jwt from "jsonwebtoken"
import con from "../config/mysql.js"

function getToken(token) {
    return new Promise((resolve, reject) => {
        con.query("SELECT token FROM tokens WHERE token = ? LIMIT 1",
        [token],
        (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // authHeader && membuat jika null tidak error
    
    let isInvalid = getToken(token)

    if (token == null) return res.sendStatus(401)

    isInvalid = await isInvalid
    if (isInvalid[0] != null) {
        return res.status(403).json({message: "Tidak autentikasi (rahasia)"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if (err) {
            return res.status(403).json(err)
        } else {
            return next()
        }
    })
}



export default verifyToken