// Node modules.


// 3rd party modules.
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';


// Own modules.
import User from '../models/User.js';
import { generateId, generateJWT } from '../helpers/tokens.js';
import { passwordResetEmail, verificationEmail } from '../helpers/emails.js';


// Controller development.

const loginForm = (req, res) => {
    // res.render already knows it should position itself in directory "./views" as it was defined in app.set() in index.js
    // so in this case, app.render() will render the "login.pug" file found in such a folder.
    res.render('auth/login', {
        page: 'Sign In',
        csrfToken: req.csrfToken()
    });

}

const login = async (req, res) => {
    await check('email', 'Email is mandatory').isEmail().run(req);
    await check('password', 'Password is mandatory').notEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('auth/login', {
            page: 'Sign In',
            errors: errors.array(),
            csrfToken: req.csrfToken()
        });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.render('auth/login', {
            page: 'Sign In',
            errors: [{msg: 'Invalid credentials'}],
            csrfToken: req.csrfToken()
        });
    }

    if (!user.isVerified) {
        return res.render('auth/login', {
            page: 'Sign In',
            errors: [{msg: 'Account is not active'}],
            csrfToken: req.csrfToken()
        });
    }

    // validate password.
    // It can be done direclty here.
    // const isCorrectPassword = bcrypt.compareSync(password, user.password);

    // Or with a custom method being added to the model.
    const isCorrectPassword = user.validatePassword(password);

    if (!isCorrectPassword) {
        return res.render('auth/login', {
            page: 'Sign In',
            errors: [{msg: 'Invalid credentials'}],
            csrfToken: req.csrfToken()
        });
    }

    // Login user.
    const token = generateJWT({id: user.id, name: user.name});

    return res.cookie('_token', token, {
        httpOnly: true, // Protects against cross site attacks. They cannot be accessed from the javascript api (browser console)
        // secure: true // Allows cookie in https connections only.
    }).redirect('/my-properties');
}

const registerForm = (req, res) => {
    return res.render('auth/register', {
        page: 'Register',
        csrfToken: req.csrfToken() // Passing CSRF token to the view so it's used by csurf to validate there is no request forgery.
    });
}

const register = async (req, res) => {

    // await check('name', 'Name is mandatory').notEmpty().run(req);
    await check('name').notEmpty().withMessage('Name is mandatory').run(req);
    await check('email').isEmail().withMessage('A valid email is required').run(req);
    await check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);
    await check('password').equals(req.body['repeat-password']).withMessage('Passwords do not match').run(req);

    const errors = validationResult(req);

    // If errors are returned by express-validator.
    // Render the register page again but passing in all the errors as an array.
    // Also passing the input data already completed by the user. So it's retained in the front-end.
    if (!errors.isEmpty()) {
        return res.render('auth/register', {
            page: 'Register',
            errors: errors.array({ onlyFirstError: true }),
            user: {
                name: req.body.name,
                email: req.body.email
            },
            csrfToken: req.csrfToken() // Passing CSRF token to the view so it's used by csurf to validate there is no request forgery.
        });
    }

    // Validate duplicated user (email).
    const userExists = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (userExists) {
        return res.render('auth/register', {
            page: 'Register',
            errors: [{msg: 'User already registered'}],
            user: {
                name: req.body.name,
                email: req.body.email
            },
            csrfToken: req.csrfToken() // Passing CSRF token to the view so it's used by csurf to validate there is no request forgery.
        });
    }

    // Create user if all validations are successful.
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        token: generateId(),
        isVerified: false
    });

    // Once the user is created in the DB, send the data required for the verification email.
    verificationEmail({
        name: user.name,
        email: user.email,
        token: user.token
    });

    // Return confirmation message.
    return res.render('templates/message', {
        page: 'Account Created',
        message: "We've sent you a confirmation email. Please check your email inbox and follow the instructions to activate your account."
    });
}

const activateAccount = async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({ where: { token }});

    if (!user) {
        return res.render('auth/activate-account', {
            page: 'Account Activation Failed',
            message: 'There has been an error when activating your account.',
            error: true
        });
    }

    // If the token used when activating the account is valid. We cleare its value and set the account as verified.
    user.token = null;
    user.isVerified = true;

    await user.save();

    return res.render('auth/activate-account', {
        page: 'Account Activated',
        message: 'Your account has been successfully activated.'
        // error: false
    });
}

const recoverPasswordForm = (req, res) => {
    res.render('auth/recover-password', {
        page: 'Password Recovery',
        csrfToken: req.csrfToken()
    });
}

const recoverPassword = async (req, res) => {
    await check('email').isEmail().withMessage('A valid email is required').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('auth/recover-password', {
            page: 'Password Recovery',
            errors: errors.array(),
            csrfToken: req.csrfToken()
        });
    }

    const user = await User.findOne({ where: { email: req.body.email }});

    // If the user is found. Send an email to reset the password.
    if (user) {
        user.token = generateId();

        await user.save();

        passwordResetEmail({
            name: user.name,
            email: user.email,
            token: user.token
        });
    }

    // Whether a user is found or not with the given email. Send the same message back to the client.
    return res.render('templates/message', {
        page: 'Password Recovery',
        message: 'If the given email address matches our records, you will soon receive an email with instructions to reset your password.',
        csrfToken: req.csrfToken()
    });
}


const resetPasswordForm = async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({ where: { token } });

    if (!user) {
        return res.render('auth/activate-account', {
            page: 'Invalid Token',
            message: "Your token has expired. Please start the process from the beginning.",
            error: true
        });
    }

    return res.render('auth/reset-password', {
        page: 'Password Reset',
        csrfToken: req.csrfToken()
    });
}


const resetPassword = async (req, res) => {
    await check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);
    await check('password').equals(req.body['repeat-password']).withMessage('Passwords do not match').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('auth/reset-password', {
            page: 'Password Reset',
            errors: errors.array({ onlyFirstError: true }),
            csrfToken: req.csrfToken()
        });
    }

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ where: { token } })

    // This should not be needed because if a user reached to this point, it means it already exists in the DB.
    if (!user) {
        return res.render('auth/activate-account', {
            page: 'Invalid Token',
            message: "Your token has expired. Please start the process from the beginning.",
            error: true
        });
    }

    // Hash the new password and wipe out the token.
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    user.token = null;

    // Save the changes in the DB.
    await user.save();

    return res.render('auth/activate-account', {
        page: 'Password Reset',
        message: 'Your password has been successfully reset.'
    });
}


export {
    loginForm,
    login,
    registerForm,
    register,
    activateAccount,
    recoverPasswordForm,
    recoverPassword,
    resetPasswordForm,
    resetPassword
}