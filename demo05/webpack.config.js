//要安装url-loader、file-loader
//img是文件夹名，name是打包源文件的名字hash是哈希值，ext是同一的后缀名
module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.(png|jpg)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name:'img/[name].[hash:7].[ext]'
            }
        }]
    }
};
