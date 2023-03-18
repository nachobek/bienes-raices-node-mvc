

import Property from './Property.js';
import Price from './Price.js';
import Category from './Category.js';
import User from './User.js';

// 1:1 relationship between Property and Price/User/Category
// Price.hasOne(Property);
Property.belongsTo(Price, { foreignKey: 'priceId' });
Property.belongsTo(User), { foreignKey: 'userId' };
Property.belongsTo(Category, { foreignKey: 'categoryId' });

// Relationships between Category and User for Property table.

export {
    Property,
    Price,
    Category,
    User
}