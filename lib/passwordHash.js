import { hash, compare } from "bcryptjs";


export async function hashPassword(password){
    const passwordHash = hash(password, 14)

    return passwordHash
}

export async function verifyPassword(password, hashedPassword){
    const isValid  = await compare(password, hashedPassword);
    return isValid
}