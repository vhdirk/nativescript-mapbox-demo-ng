const webpack = require('@nativescript/webpack');

module.exports = (env) => {
    webpack.Utils.addCopyRule({
        from: '../demo-snippets/assets',
        to: '.'
    });

    webpack.init(env);

    const { redirect } = env;

    webpack.chainWebpack((config) => {
        config.plugin('DefinePlugin').tap((args) => {
            if (redirect) {
                Object.assign(args[0], {
                    demoRedirect: JSON.stringify(redirect)
                });
            } else {
                Object.assign(args[0], {
                    demoRedirect: JSON.stringify("")
                });
            }
            return args;
        });
    });

    return webpack.resolveConfig();
};
