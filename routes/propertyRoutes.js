import express from 'express';
import { body } from 'express-validator'; // Same as check but only checking req.body.


import { admin, listPropertyForm, listProperty, uploadImageForm } from '../controllers/propertyController.js';
import protectRoute from '../middlewares/protectRoute.js';


// Router development.

const router = express.Router();


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


export default router;