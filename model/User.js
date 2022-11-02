import { DataTypes, Model } from "sequelize"
import db from "../config/database.js"
import Stationery from "./Stationery.js"

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING
    }
},
{
    sequelize: db,
    modelName: 'User',
    tableName: 'users'
})

User.hasMany(Stationery)
Stationery.belongsTo(User)

export default User;

// (async () => {
//     await db.sync()
// })()
