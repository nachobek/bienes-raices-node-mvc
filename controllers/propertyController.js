import { validationResult } from 'express-validator';


import { Price, Category, Property } from '../models/index.js';


const admin = (req, res) => {
    return res.render('properties/admin', {
        page: 'My Properties'
    });
}

// Form to list a new property.
const listPropertyForm = async (req, res) => {
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]);

    return res.render('properties/list', {
        page: 'List Property',
        categories,
        prices,
        csrfToken: req.csrfToken(),
        formData: {} // Sending an empty object so the "autocomplete" logic in the view won't throw an error.
    });
}

const listProperty = async (req, res) => {
    // Gather potential errors identified by "body()" in the router.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ]);

        return res.render('properties/list', {
            page: 'List Property',
            categories,
            prices,
            errors: errors.array({ onlyFirstError: true }),
            csrfToken: req.csrfToken(),
            formData: req.body // Passing the body back to the form so it preserves the user inputed data.
        });
    }

    const { title, description, category, price, rooms, parking, bathroom, street, lat, lng} = req.body;

    const { id: userId } = req.user;

    try {
        const newProperty = await Property.create({
            title,
            description,
            rooms,
            parking,
            bathroom,
            street,
            lat,
            lng,
            image: '',
            // isPublished,
            priceId: price,
            userId, // id destructured from req.user
            categoryId: category
        });

        return res.redirect(`/properties/upload-image/${newProperty.id}`);
    } catch (error) {
        // throw new Error('Failure when inserting a Property in the DB:\n', error);
        console.log('Failure when inserting a Property in the DB:\n', error);
    }
}

const uploadImageForm = async (req, res) => {
    res.render('properties/upload-image', {
        page: 'Upload Property Images',
        csrfToken: req.csrfToken(),
        formData: {}

    });
}


export {
    admin,
    listPropertyForm,
    listProperty,
    uploadImageForm
}