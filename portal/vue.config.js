if (process.env.NODE_ENV === 'development') {
    // dev
    module.exports = {
        devServer: {
            proxy: {
                '/serve': {
                    // target: 'http://127.0.0.1:80',
                    target: 'http://localhost:81',
                    // pathRewrite:{
                    //     '^/service':'/public'
                    // }
                },
                '/static': {
                    target: 'http://127.0.0.1:81',
                    // target: 'http://localhost:80',
                    // pathRewrite:{
                    //     '^/data':'/'
                    // }
                },
            }
        },
        lintOnSave: undefined
    }
} else {
    // build
    module.exports = {
        // productionSourceMap:false
    }
    
}

