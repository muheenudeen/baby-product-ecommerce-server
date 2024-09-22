import jwt from 'jsonwebtoken'

const genetateToken = (userId) =>{
    return jwt.sign({_id : userId},process)
}

export default genetateToken