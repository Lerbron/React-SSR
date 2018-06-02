const fs = require('fs'),
	path = require('path'),
	webpack = require('webpack'),
	CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: 'inline-source-map',

	entry: path.resolve(__dirname, 'server/index.js'),

	output: {
		filename: 'server.bundle.js',
		path: path.join(__dirname, './dist')
	},

	target: 'node',

	externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
		'react-dom/server', 'react/addons'
	]).reduce(function (ext, mod) {
		ext[mod] = 'commonjs ' + mod;
		return ext;
	}, {}),

	node: {
		__filename: true,
		__dirname: true
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
		new webpack.DefinePlugin({
			'process.env': {
				ENV: JSON.stringify(JSON.stringify( process.env.NODE_ENV !== 'production' ? 'development': 'production')),
				NODE_ENV: JSON.stringify( process.env.NODE_ENV !== 'production' ? 'development': 'production')
			},
			'__NODE__': JSON.stringify(true)
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),
		// new webpack.optimize.UglifyJsPlugin({                 // 压缩打包的js文件
		// 	sourceMap: true,                                    // 当你的js编译压缩后，需要继续读取原始脚本信息的行数，位置，警告等有效调试信息时,手动开启UglifyJsPlugin 的配置项：sourceMap: true
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
	],

};