import express from 'express';
import { body } from 'express-validator'; // Same as check but only checking req.body.


import { admin, listPropertyForm, listProperty, uploadImageForm, uploadImage, editPropertyForm, editProperty, deleteProperty, displayProperty } from '../controllers/propertyController.js';
import protectRoute from '../middlewares/protectRoute.js';
import upload from '../middlewares/uploadImage.js';


// Router development.

const router = express.Router();


// Private section

router.get('/my-properties', protectRoute, admin);

router.get('/properties/list', protectRoute, listPropertyForm);

router.post('/properties/list', [
    protectRoute,
    body('title', 'Listing tittle is required').notEmpty(),
    body('description', 'Property description is required')
        .notEmpty()
        .isLength({ max: 255 }).withMessage('The Description is too long'),
    body('category', 'Select a category').isNumeric(),
    body('price', 'Select a price range').isNumeric(),
    body('rooms', 'Select the number of rooms').isNumeric(),
    body('parking', 'Select the number of parking spots').isNumeric(),
    body('bathroom', 'Select the number of badthrooms').isNumeric(),
    body('lat', 'Locate the property on the map').notEmpty(),
], listProperty);

router.get('/properties/upload-image/:propertyId', protectRoute, uploadImageForm);

router.post('/properties/upload-image/:propertyId',
    protectRoute,
    upload.single('image'),
    // At this point the image is already in the server. We need to update the data in the DB.
    uploadImage
);

router.get('/properties/edit/:propertyId', protectRoute, editPropertyForm);

router.post('/properties/edit/:propertyId', [
    protectRoute,
    body('title', 'Listing tittle is required').notEmpty(),
    body('description', 'Property description is required')
        .notEmpty()
        .isLength({ max: 255 }).withMessage('The Description is too long'),
    body('category', 'Select a category').isNumeric(),
    body('price', 'Select a price range').isNumeric(),
    body('rooms', 'Select the number of rooms').isNumeric(),
    body('parking', 'Select the number of parking spots').isNumeric(),
    body('bathroom', 'Select the number of badthrooms').isNumeric(),
    body('lat', 'Locate the property on the map').notEmpty(),
], editProperty);

router.post('/properties/delete/:propertyId', protectRoute, deleteProperty);


// Public section

router.get('/property/:propertyId', displayProperty);


export default router;