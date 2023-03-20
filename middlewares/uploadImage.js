// Node modules.
import path from 'path';

// 3rd party modules.
import multer from "multer";

// Own modules.
import { generateId } from '../helpers/tokens.js';


// Middleware development.

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // If the callback is called, it'd mean the file is being saved successfully.
        callback(null, './public/uploads/');
    },
    filename: (req, file, callback) => {
        // If callback is called, the file has been already uploaded with no errors.
        callback(null, generateId() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


export default upload;