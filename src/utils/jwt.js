import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

exports.signinToken = (params) => {
    const token = jwt.sign(params, process.env.secretKey || "publicTokenKey", { expiresIn: process.env.EXPIRES_IN || "24h" })
    return token
}
