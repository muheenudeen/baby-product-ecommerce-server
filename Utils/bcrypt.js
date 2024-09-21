import bcrypt from "bcrypt"

const hashedPassword = async (password)=>{
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, newPassword)=>{
    return await bcrypt.compare(password ,newPassword);
};

export const bcryptData = {
    hashedPassword,
    comparePassword
}