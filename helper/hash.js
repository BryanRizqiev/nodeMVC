import bcrypt from "bcrypt"

const hash = (password, longSalt) => {
    const salt = bcrypt.genSaltSync(longSalt)
    return bcrypt.hashSync(password, salt) 
}

const comparePassword = (userPassword, hashedPassword) => {
    return bcrypt.compareSync(userPassword, hashedPassword)
}

export { hash, comparePassword }
