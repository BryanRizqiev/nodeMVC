import mysql from "mysql2"

const con = mysql.createPool({
    host: "103.129.222.7",
    user: "prakozov_bryan",
    password: "yahahawahyu",
    database: "prakozov_db"
})

export default con
