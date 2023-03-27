

import Property from './Property.js';
import Price from './Price.js';
import Category from './Category.js';
import User from './User.js';
import Message from './Message.js';

// 1:1 relationship between Property and Price/User/Category
// Price.hasOne(Property);
Property.belongsTo(Price, { foreignKey: 'priceId' });
Property.belongsTo(User, { foreignKey: 'userId' });
Property.belongsTo(Category, { foreignKey: 'categoryId' });
// Relationship 1:M between Property and Messages
// With this, when I "include" the Message model while querying the Property model. It will return an array of Message with all the messages for a given property.
// See "admin" method in propertyController.js
Property.hasMany(Message, { foreignKey: 'propertyId' });

// Relationship 1:1 between Message and Property/User
Message.belongsTo(Property, { foreignKey: 'propertyId' });
Message.belongsTo(User, { foreignKey: 'userId' });


export {
    Property,
    Price,
    Category,
    User,
    Message
}