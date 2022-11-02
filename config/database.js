import { Sequelize } from "sequelize"

const db = new Sequelize('schoolldbwithsequelize', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
})

export default db