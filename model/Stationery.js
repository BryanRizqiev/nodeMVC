import { DataTypes, Model } from "sequelize"
import db from "../config/database.js"
import User from "./User.js";

class Stationery extends Model {
}

Stationery.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize: db,
    modelName: 'Stationery'
})

// foreignKey: 'UserId' munkin akan generate otomatis
// Stationery.belongsTo(User, {
//     foreignKey: 'UserId'
// })

export default Stationery;

// aware to semicolon export default

// (async () => {
//     await db.sync()
// })()