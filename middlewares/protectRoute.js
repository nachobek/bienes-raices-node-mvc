import jwt from 'jsonwebtoken';


import { User } from '../models/index.js';


const protectRoute = async (req, res, next) => {
    const { _token } = req.cookies;

    if (!_token) {
        return res.redirect('/auth/login');
    }

    try {
        const tokenDecoded = jwt.verify(_token, process.env.JWT_SECRET);

        const user = await User.scope('hideSensitiveFields').findOne({ 
            where: {
                id: tokenDecoded.id,
                isVerified: true
            }
        });

        if (!user) {
            return res.redirect('/auth/login');
        }

        req.user = user;

        return next();
    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login');
    }
}


export default protectRoute;