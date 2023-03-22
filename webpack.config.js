import path from 'path'

export default {
    mode: 'development',
    entry: {
        map: './src/js/map.js',
        uploadImage: './src/js/uploadImage.js',
        displayMap: './src/js/displayMap.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}