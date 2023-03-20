import jwt from 'jsonwebtoken';


const generateId = () => {
    return Math.random().toString(32).substring(2) + Date.now().toString(32);
}


const generateJWT = userData => jwt.sign({ id: userData.id, name: userData.name }, process.env.JWT_SECRET, { expiresIn: '3h' });


export {
    generateId,
    generateJWT
}