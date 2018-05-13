const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
	devtool: 'inline-source-map',
	entry: {
		main: path.resolve(__dirname, "src/main.js"),
		vendor: ['react', 'react-dom', 'react-router', 'babel-polyfill', 'redux', 'react-redux']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].js'
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [{
					loader: 'babel-loader',
					query: {
						presets: [
							require.resolve('babel-preset-es2015'),
							require.resolve('babel-preset-env'),
							require.resolve('babel-preset-stage-0'),
							require.resolve('babel-preset-stage-2'),
						],
					}
				}],
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
				]
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					"css-loader",
					"less-loader"
				]
			},
			{
				test: /\.(gif|png|jpe?g)$/,
				use: [{
					loader: "file-loader",
					options: {
						name: "static/img/[name].[ext]"
					}
				}]
			},
			{
				test: /\.(ttf|eot|svg|woff)(\?(\w|#)*)?$/,
				use: [{
					loader: "file-loader",
					options: {
						name: "static/font/[name].[ext]"
					}
				}]
			}
		]
	},

	plugins: [
		// new ExtractTextPlugin('/main.css'),

		new webpack.DefinePlugin({
			'process.env': {
				ENV: JSON.stringify('development'),
				NODE_ENV: JSON.stringify('development')
			},
			'__NODE__': JSON.stringify(false)
		}),

		new webpack.optimize.CommonsChunkPlugin({
			names: 'vendor',
			minChunks: Infinity
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),
		new CleanWebpackPlugin('dist'),
		// new webpack.optimize.UglifyJsPlugin({                 // 压缩打包的js文件
		// 	sourceMap: true,                                    // 当你的js编译压缩后，需要继续读取原始脚本信息的行数，位置，警告等有效调试信息时,手动开启UglifyJsPlugin 的配置项：sourceMap: true
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
	]
};