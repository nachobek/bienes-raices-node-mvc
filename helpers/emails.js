import nodemailer from 'nodemailer';

const verificationEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { name, email, token } = data;

    // Send email thru Mailtrap.
    // This is using the nodemailer module but it's using Mailtrap as the email server to send the emails.
    await transport.sendMail({
        from: 'no-reply@RealState.com',
        to: email,
        subject: 'RealState - Activate your account',
        text: 'Activate your RealState account',
        html: `
            <p>Hi ${name},</p>

            <p>Activate your RealState account</p>

            <p>Your account is almost ready, please activate it by following the link below:</p>
            <p><a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/activate/${token}">Activate Account</a></p>

            <p>You can ignore this message if you haven't created a RealState account.</p>
        `
    });
}


const passwordResetEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { name, email, token } = data;

    await transport.sendMail({
        from: 'no-reply@RealState.com',
        to: email,
        subject: 'RealState - Recover your account',
        text: 'Recover your RealState account',
        html: `
            <p>Hi ${name},</p>

            <p>Recover your RealState account</p>

            <p>You can reset your RealState account's password by following the link below:</p>
            <p><a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/recover-password/${token}">Reset Password</a></p>

            <p>You can ignore this message if you haven't requested a passowrd reset.</p>
        `
    });

}

export {
    verificationEmail,
    passwordResetEmail
}