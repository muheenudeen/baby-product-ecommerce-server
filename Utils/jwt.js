import jwt from 'jsonwebtoken'

const generateToken = (userId) =>{
    return jwt.sign({_id : userId},process)
}

export default generateToken