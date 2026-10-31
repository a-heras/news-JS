module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        publicPath: '/',
    },
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
        compress: true,
        client: {
            overlay: true,
        },
        proxy: [
            {
                pathFilter: ['/api-proxy'],
                router: () => 'https://rss-news-api.onrender.com',
                changeOrigin: true,
                pathRewrite: { '^/api-proxy': '' },
            },
        ],
    },
};