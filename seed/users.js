import bcrypt from 'bcrypt';


const users = [
    {
        name: 'Test User 1',
        email: 'test1@test.com',
        password: bcrypt.hashSync('123456', 10),
        isVerified: true
    }
];


export default users;