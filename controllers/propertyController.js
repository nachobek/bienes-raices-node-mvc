import Category from '../models/Category.js';
import Price from '../models/Price.js';


const admin = (req, res) => {
    return res.render('properties/admin', {
        page: 'My Properties',
        header: true
    });
}

// Form to list a new property.
const list = async (req, res) => {
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]);

    return res.render('properties/list', {
        page: 'List Property',
        header: true,
        categories,
        prices
    });
}


export {
    admin,
    list
}