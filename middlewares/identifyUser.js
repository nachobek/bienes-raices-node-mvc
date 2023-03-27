import jwt from 'jsonwebtoken';


import User from '../models/User.js';


const identifyUser = async (req, res, next) => {
    // Identify if there is a token.
    // const token = req.cookies._token;
    const { _token } = req.cookies;

    if (!_token) {
        req.user = null;
        return next();
    }

    // Verify token.
    try {
        const tokenDecoded = jwt.verify(_token, process.env.JWT_SECRET);

        const user = await User.scope('hideSensitiveFields').findOne({ 
            where: {
                id: tokenDecoded.id,
                isVerified: true
            }
        });

        if (user) {
            req.user = user;
        }

        return next();
    } catch (error) {
        console.log('Error when identifying the user.\n', error)
        return res.clearCookie('_token').redirect('/auth/login');
    }
}


export default identifyUser;