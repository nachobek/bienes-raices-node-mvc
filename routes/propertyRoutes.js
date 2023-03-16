import express from 'express';


import { admin, list } from '../controllers/propertyController.js';



// Router development.

const router = express.Router();


router.get('/my-properties', admin);
router.get('/properties/list', list);


export default router;