// Node modules.
import { unlink } from 'node:fs/promises'

// 3rd party modules.
import { validationResult } from 'express-validator';

// Own modules.
import { Price, Category, Property } from '../models/index.js';


// Controller development.
const admin = async (req, res) => {
    // Identify and validate page number.
    const { page: currentPage } = req.query;

    // Any number starting with "1 to 9" and finishing with "0 to 9".
    // const regex = /^[0-9]+$/; // The problem with this one is that you can do: 00012.
    const regex = /^[1-9][0-9]*$/;

    if (!regex.test(currentPage)) {
        console.log('holis\nholis\nholis\nholis\nholis\n')
        return res.redirect('/my-properties?page=1');
    }

    try {
        // Pagination Limit/Offset
        const limit = 5;
        const offset = ((currentPage * limit) - limit);

        // Gather user and its listed properties.
        const { id: userId } = req.user;

        const [properties, propertiesCount] = await Promise.all([
            Property.findAll({
                limit,
                offset,
                where: {
                    userId
                },
                include: [
                    { model: Category, as: 'category' },
                    { model: Price, as: 'price' }
                ]
            }),
            Property.count({
                where: {
                    userId
                }
            })

        ]);

        return res.render('properties/admin', {
            page: 'My Properties',
            properties,
            csrfToken: req.csrfToken(),
            totalPages: Math.ceil(propertiesCount / limit),
            currentPage: Number(currentPage),
            limit,
            offset,
            propertiesCount
        });
    } catch (error) {
        console.log(`Error when listing properties.\n`, error);
        return res.redirect(`/my-properties?page=1`);
    }
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

    const { title, description, category, price, rooms, parking, bathroom, address, lat, lng} = req.body;

    const { id: userId } = req.user;

    try {
        const newProperty = await Property.create({
            title,
            description,
            rooms,
            parking,
            bathroom,
            address,
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
    const { propertyId } = req.params;

    const property = await Property.findByPk(propertyId);

    if (!property) {
        return res.redirect('/my-properties');
    }

    if (property.isPublished) {
        // If the property is already published, we don't allow access to the "upload-image" page.
        return res.redirect('/my-properties');
    }

    // Validate that the authenticated user owns the property to be published.
    if (req.user.id.toString() !== property.userId.toString()) {
        return res.redirect('/my-properties');
    }

    res.render('properties/upload-image', {
        page: 'Upload Property Images',
        csrfToken: req.csrfToken(),
        property // Passing back the property info to the form, so it can create the POST url based on the property ID.
    });
}

const uploadImage = async (req, res, next) => {
    
    const { propertyId } = req.params;

    const property = await Property.findByPk(propertyId);

    if (!property) {
        return res.redirect('/my-properties');
    }

    if (property.isPublished) {
        return res.redirect('/my-properties');
    }

    if (req.user.id.toString() !== property.userId.toString()) {
        return res.redirect('/my-properties');
    }

    try {
        property.image = req.file.filename;
        property.isPublished = true;

        await property.save();

        // This redirect does not take effect because when the "publish" button is pressed, the dropzone script (/src/js/uploadImage.js) takes over.
        // return res.redirect('/my-properties');

        // The redirect within the dropzone script will not take effect either, unless there is a next() to move on to the next middleware.
        return next();
    } catch (error) {
        console.log('Error when storing the image.\n', error);
    }
}

const editPropertyForm = async (req, res) => {
    // Validate property exists.
    const { propertyId } = req.params;

    const property = await Property.findByPk(propertyId);

    if (!property) {
        return res.redirect('/my-properties');
    }

    // Validate that the authenticated user owns the property to be published.
    if (req.user.id.toString() !== property.userId.toString()) {
        return res.redirect('/my-properties');
    }

    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]);

    return res.render('properties/edit', {
        page: `Edit Property`,
        categories,
        prices,
        csrfToken: req.csrfToken(),
        formData: property
    });
}

const editProperty = async (req, res) => {
    // Gather potential errors identified by "body()" in the router.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ]);

        return res.render('properties/edit', {
            page: `Edit Property`,
            categories,
            prices,
            errors: errors.array({ onlyFirstError: true }),
            csrfToken: req.csrfToken(),
            formData: req.body
        });
    }

    // Validate property exists.
    const { propertyId } = req.params;

    const property = await Property.findByPk(propertyId);

    if (!property) {
        return res.redirect('/my-properties');
    }

    // Validate that the authenticated user owns the property to be published.
    if (req.user.id.toString() !== property.userId.toString()) {
        return res.redirect('/my-properties');
    }

    try {
        const { title, description, category, price, rooms, parking, bathroom, address, lat, lng} = req.body;

        property.set({
            title,
            description,
            rooms,
            parking,
            bathroom,
            address,
            lat,
            lng,
            priceId: price,
            categoryId: category
        });

        await property.save();

        return res.redirect(`/my-properties`);
    } catch (error) {
        console.log(`Error when updating Property ${property.id} in the DB.\n`, error);
    }
}

const deleteProperty = async (req, res) => {
    // Validate property exists.
    const { propertyId } = req.params;

    const property = await Property.findByPk(propertyId);

    if (!property) {
        return res.redirect('/my-properties');
    }

    // Validate that the authenticated user owns the property to be published.
    if (req.user.id.toString() !== property.userId.toString()) {
        return res.redirect('/my-properties');
    }

    try {
        // Remove image from server.
        await unlink(`public/uploads/${property.image}`);

        // Delete record from DB.
        await property.destroy();

        return res.redirect('/my-properties');
    } catch (error) {
        console.log(`Error when deleting Property ${property.id} from the DB.\n`, error);
        return res.redirect(`/my-properties`);
    }
}

const displayProperty = async (req, res) => {
    // Validate property exists.
    const { propertyId } = req.params;

    const property = await Property.findByPk(propertyId, {
        include: [
            { model: Category, as: 'category' },
            { model: Price, as: 'price' }
        ]
    });

    if (!property) {
        return res.redirect('/404');
    }

    return res.render('properties/display', {
        page: property.title,
        property
    });
}

export {
    admin,
    listPropertyForm,
    listProperty,
    uploadImageForm,
    uploadImage,
    editPropertyForm,
    editProperty,
    deleteProperty,
    displayProperty
}