import { exit } from 'node:process'


import db from '../config/db.js';
import { Category, Price } from '../models/index.js'
import categories from './categories.js';
import prices from './prices.js';


const importData = async () => {
    try {
        // Auth
        await db.authenticate();

        // Generate table/columns
        await db.sync();

        // Insert data
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices)
        ]);

        console.log('Data seeded successfully.');

        exit();
    } catch (error) {
        console.log('Failure when seeding the DB: \n', error);

        // throw new Error('Failure when seeding the DB. See console log.')

        // process.exit(1); // Forces the process to finish with error (1), even if there are asynchronous tasks still pending.
        exit(1);
    }
}


const deleteData = async () => {
    try {
        // await db.sync({force: true}); // This will drop both tables.

        // .destroy() deletes the records.
        await Promise.all([
            Category.destroy({where: {}, truncate: true}), //Truncate to reset the auto-incrementing ID.
            Price.destroy({where: {}, truncate: true})
        ]);

        console.log('Data deleted successfully.');

        exit();
    } catch (error) {
        console.log('Failure when deleting from the DB: \n', error);

        exit(1);
    }
}




// Set up entry point depending on argument passed.

switch (process.argv[2]) {
    case '-i':
        importData();
        break;

    case '-d':
        deleteData();
        break;

    default:
        console.log('Unexpected argument.');
        exit(1);
}


// if (process.argv[2] === '-i') {
//     importData();
// }