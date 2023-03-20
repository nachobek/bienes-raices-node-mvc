import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';


import db from '../config/db.js';


const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
}, {
    // Hooks are functions to enhace a model with. Like automatically hashing the password as shown below.
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    },
    // Scopes can be used to hide fields when accessing the model or reuse code by defining commonly used queries.
    scopes: {
        hideSensitiveFields: {
            attributes: {
                exclude: ['password', 'token', 'isVerified', 'createdAt', 'updatedAt']
            }
        }
    }
});


// Custom method
User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}


export default User;