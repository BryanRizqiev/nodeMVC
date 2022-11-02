import { hash, comparePassword } from "../helper/hash.js"
import { generateToken } from "../helper/jwt.js"
import User from "../model/User.js"
import Stationery from "../model/Stationery.js"
import con from "../config/mysql.js"
import jwt from "jsonwebtoken"

class UserController {

    static async register(req, res) {
    
        try {
            const { name, email, password, address } = req.body
            const hashedPassword = hash(password, 10)
    
            await User.create({
                name,
                email,
                password: hashedPassword,
                address
            })
            
            return res.status(201).json({ name, email, password, address, status: "Success" })
        } catch (err) {
            console.log(err)
            return res.status(400).json({message: err.message})
        }
    }

    static async login(req, res) {

        try {

            const { email, password } = req.body
            
            const result = await User.findOne({
                where: { email }
            })

            if (!result) {
                return res.status(400).json({message: "Kredensial tidak cocok"})
            } else  {
                const compare = comparePassword(password, result.password)

                if (!compare) return res.status(400).json({message: "Kredensial tidak cocoks"})
                
                const token = generateToken({
                    user: result.id,
                    email: result.email
                })

                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })

                return res.status(200).json({token})
            }

        } catch (err) {
            console.log(err);
            return res.status(400).json({message: "Error"})
        }
        
    }

    static async refreshToken(req, res) {

        const { token } = req.cookies

        if (!token) return res.status(403).json(err)

        jwt.verify(token, process.env.SECRET_KEY, (err) => {
            if (err) {
                return res.status(403).json(err)
            } else {
                const user = jwt.decode(token)
                const newToken = generateToken({
                    user: user.id,
                    email: user.email
                })

                res.cookie("token", newToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })

                return res.status(200).json({newToken})                
            }
        })
    }

    static async index(req, res) {

        return res.send("Yahaha wahyu")
    }

    // client auto from cookie or post in bearer token?
    static async logout(req, res) {

        // getToken
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1] // authHeader && membuat jika null tidak error

        con.query('INSERT INTO tokens (token) VALUES (?)',
        [token],
        (err) => {
          if (err) {
            return res.status(403).json(err)
          } else {
            return res.status(200).json({message: "Berhasil logout"})
          }
        })
    }

    static async getDatas(req, res) {
        
        const result = await User.findOne({
            where: {id : 1},
            include : {model: Stationery}
        })

        return res.status(200).json({
            name: result.name,
            address: result.address,           
            stationeries: result.Stationeries.map((data) => {
                return {
                    nama: data.name,
                    quantity: data.quantity
                }
            })
        })
    }

    static async cobaCuy(req, res) {
        
        const result = await Stationery.findOne({
            where: {id : 1},
            include: {model: User}
        })
     
        return res.status(200).json(result)
    }
}

export default UserController