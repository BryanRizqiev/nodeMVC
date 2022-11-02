import { Sequelize } from "sequelize"

const db = new Sequelize('prakozov_db', 'prakozov_bryan', 'yahahawahyu', {
    host: '103.129.222.7',
    dialect: "mysql"
})

export default db
