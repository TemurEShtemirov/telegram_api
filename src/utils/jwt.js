import jwt from 'jsonwebtoken'
import 'dotenv/config'
const secret_key = process.env.SECRET_KEY


export const generateToken = (data) => {
    const token = jwt.sign(data, secret_key, { expiresIn: '1h' });
    return token;
};

export const verifyToken = (token) => {
    const decoded = jwt.verify(token,secret_key );
    return decoded;
};


