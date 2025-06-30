const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.tsx'),
    output: {
        path: path.join(__dirname + '/dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@@': path.resolve(__dirname, 'public'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[name]__[local]--[hash:base64:5]',
                            },
                            sourceMap: true,
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ],
                            sourceMaps: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname + '/public/index.html'),
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        open: true,
    },
    devtool: 'source-map',
};
