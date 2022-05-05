module.exports = {
    devServer: {
        proxy: {
            // 设置代理，可以根据不同前缀设置不同的请求ip，域名
            '/api': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                pathRewrite: {'^/api': ''}
            }
        }
    }
}