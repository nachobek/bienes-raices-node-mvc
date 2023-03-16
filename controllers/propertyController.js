
const admin = (req, res) => {
    return res.render('properties/admin', {
        page: 'My Properties',
        header: true
    });
}


const list = (req, res) => {
    return res.render('properties/list', {
        page: 'List Property',
        header: true
    });
}


export {
    admin,
    list
}