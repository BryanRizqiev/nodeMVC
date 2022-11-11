import { hash, comparePassword } from "../helper/hash.js"
import { generateToken } from "../helper/jwt.js"
import User from "../model/User.js"
import Stationery from "../model/Stationery.js"
import con from "../config/mysql.js"
import jwt from "jsonwebtoken"
import dns from "dns/promises"
import Validator from "fastest-validator"
const v = new Validator()

class UserController {

    static async register(req, res) {
    
        const schema = {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            address: { type: "string" }
        }

        try {

            const { name, email, password, address } = req.body

            let check = v.compile(schema)
            check = check({ name, email, password, address })
            if (check.length) return res.status(400).json(check)

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

        const schema = {
            email: { type: "string" },
            password: { type: "string" }
        }

        try {

            const { email, password } = req.body

            let check = v.compile(schema)
            check = check({ email, password })
            if (check.length) return res.status(400).json(check)
            
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

        if (!token) return res.setStatus(403)

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
        
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const user = jwt.decode(token)

        console.log(user.user)

        const result = await User.findOne({
            where: {id : user.user},
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

    static async getDns(req, res) {

        const ip = dns.lookup(req.query.dns)

        return res.json({ip})
    }

    // percobaan
    static async cobaCuy(req, res) {
        
        const result = await Stationery.findOne({
            where: {id : 1},
            include: {model: User}
        })
     
        return res.status(200).json(result)
    }

    static async coba(req, res) {

        return res.status(200).json({message: "Yahaha wahyu"})
    }
}

export default UserController