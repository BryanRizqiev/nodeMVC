import { DataTypes, Model } from "sequelize"
import db from "../config/database.js"

class Lecturer extends Model {
}

Lecturer.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: "Lecturer",
    tableName: "lecturers"
})

export default Lecturer;

// (async () => {
//     await db.sync()
// })()