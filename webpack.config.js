import path from 'path'

export default {
    mode: 'development',
    entry: {
        map: './src/js/map.js',
        uploadImage: './src/js/uploadImage.js',
        displayMap: './src/js/displayMap.js',
        homePageMap: './src/js/homePageMap.js',
        changeStatus: './src/js/changeStatus.js',
        checkUserIsLogged: './src/js/checkUserIsLogged.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}