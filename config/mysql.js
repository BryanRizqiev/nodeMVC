import mysql from "mysql2"

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "schoolldbwithsequelize"
})

export default con