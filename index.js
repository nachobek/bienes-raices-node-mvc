// Node modules.
import * as url from 'url';  // Enable __dirname since it's not available by default when working with ES module.
import path from 'path'; // Alternative to importing 'url' to get to the absolute path (like __dirname).


// 3rd party modules.
// const express = require('express'); // CommonJS
import express from 'express'; // ECMAScript modules -- allowed by adding "type": "module" to the package.json.
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

// Own modules.
import userRoutes from './routes/userRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

import db from './config/db.js';


// App development.

// Creating application.
const app = express();
const port = process.env.PORT || 3000; // Port definition.


// Enable express to read the http "request" from submitted Forms.
app.use(express.urlencoded({extended: true}));
// app.use(express.json()); // Parse the "request" as a JSON.


// Enable cookie-parser
app.use(cookieParser());

// Enable CSRF.
app.use(csrf({ cookie: true }));


//DB Conection.
try {
    await db.authenticate();
    db.sync();
    console.log('Successfully connected to the DB.');
} catch (error) {
    console.log('Error when connecting to the DB \n', error);
}


// Enable additional settings (pug in this case).
app.set('view engine', 'pug');
// Define where "express" will find all the views by default.
// So if I do "res.render('templates/message')", it will know it has to look under "./views/template/message.pug"
app.set('views', './views');

// Public folder - static content
app.use(express.static('public'));

// Routing
app.use('/', appRoutes); // Public/general subroutes defined in appRoutes router.
app.use('/auth', userRoutes);
app.use('/', propertyRoutes); // Property related subroutes, such as "/my-properties"
app.use('/api', apiRoutes);


// Default 404 for non-existing routes.
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url)); // Enable __dirname since it's not available by default when working with ES modules.
app.get('*', (req, res) => {
    // res.sendFile(__dirname + '/public/404.html');
    res.sendFile(path.resolve('public/404.html')); // Alternative to creating a custom constant called __dirname.
});



// Triggering the app at given port.
app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});