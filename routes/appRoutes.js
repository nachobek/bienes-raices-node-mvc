import express from 'express';


import {homePage, category, notFound, searcher} from '../controllers/appController.js';


// Router development.
const router = express.Router();

// Home page
router.get('/', homePage);

// Categories
router.get('/categories/:categoryId', category);


// 404
router.get('/404', notFound);


// Search
router.post('/search', searcher);


export default router;