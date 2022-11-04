import Lecturer from "../model/Lecturer.js"
import Subject from "../model/Subject.js"

class SubjectController {

    static async addSubject(req, res) {

        try {

            const { name, subjectLoad, lecturerName } = req.body

            const subject = Subject.create({
                name,
                subjectLoad
            })

            const lecturer = Lecturer.create({
                name: lecturerName
            })

            const result = await Promise.all([subject, lecturer])

            const execRelation = result[0].addLecturer(result[1], { through: "Subject_Lecturer" })

            await Promise.all([lecturer, execRelation])
    
            return res.sendStatus(201)

        } catch (err) {
            console.log(err)
            return res.status(400).json(err.message)
        }
    }
}

export default SubjectController