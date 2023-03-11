import { hash } from "bcryptjs";


export async function hashPassword(password){
    const passwordHash = hash(password, 14)

    return passwordHash
}