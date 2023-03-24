import { Price, Category, Property} from '../models/index.js';

const homePage = async (req, res) => {
    const [prices, categories, featuredHouses, featuredApartments] = await Promise.all([
        Price.findAll({ raw: true }),
        Category.findAll({ raw: true }),
        Property.findAll({
            limit: 3,
            where: {
                categoryId: 1
            },
            include: [
                { model: Price, as: 'price' }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        }),
        Property.findAll({
            limit: 3,
            where: {
                categoryId: 2
            },
            include: [
                { model: Price, as: 'price' }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
    ]);

    res.render('home', {
        page: 'Home',
        prices,
        categories,
        featuredHouses,
        featuredApartments
    });
}

const category = (req, res) => {
    
}

const notFound = (req, res) => {
    
}

const searcher = (req, res) => {
    
}



export {
    homePage,
    category,
    notFound,
    searcher
}