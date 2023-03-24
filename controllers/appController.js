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

const category = async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId);

    if (!category) {
        return res.redirect('/404');
    }

    const properties = await Property.findAll({
        where: {
            categoryId
        },
        include: [
            { model: Price, as: 'price' }
        ]
    });

    res.render('category', {
        page: `${category.name}s`,
        properties
    });
}

const notFound = (req, res) => {
    res.render('404', {
        page: 'Not Found'
    });
}

const searcher = (req, res) => {
    
}



export {
    homePage,
    category,
    notFound,
    searcher
}