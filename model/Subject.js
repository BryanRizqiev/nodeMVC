import { DataTypes, Model } from "sequelize"
import db from "../config/database.js"
import Lecturer from "./Lecturer.js";

class Subject extends Model {
}

Subject.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true      
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subjectLoad: {
        type: DataTypes.TINYINT
    }
}, {
    sequelize: db,
    modelName: "Subject",
    tableName: "subjects"
})

// karena subject punya atribut lebih banyak awkwkw
Subject.belongsToMany(Lecturer, { through: "Subject_Lecturer" })
Lecturer.belongsToMany(Subject, { through: "Subject_Lecturer" })

export default Subject;

// (async () => {
//     await db.sync()
// })()