var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
	require('shelljs/global')
	// 清空构建目录
	rm('-rf', 'dist')
}

module.exports = {
	entry: {
		app: './src/main.js'
	},
	output: {
		path: './dist/static',
		filename: '[name].[chunkhash].js',
		chunkFilename: '[id].[chunkhash].js'
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.html$/,
			loader: 'vue-html'
		}, {
			test: /\.(png|jpe?g|gif)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 1024 * 10,
				name: '[name].[hash:20].[ext]'
			}
		}, {
			test: /\.(svg|woff2?|eot|ttf|otf)$/,
			loader: 'url',
			query: {
				limit: 1024 * 20,
				name: '[name].[hash:20].[ext]'
			}
		}]
	},
	plugins: [
		// 自动生成HTML文件
		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: '../index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			}
		}),

		// 提取css
		new ExtractTextPlugin('[name].[contenthash:20].css', {
			allChunks: true
		})
	],
	vue: {
		loaders: {
			css: ExtractTextPlugin.extract('css'),
			sass: ExtractTextPlugin.extract("css!sass-loader")
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	devtool: '#eval-source-map'
}

if (isProduction) {
	module.exports.devtool = '#source-map'

	module.exports.output.publicPath = 'static/'

	module.exports.plugins = (module.exports.plugins || []).concat([

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),

		new webpack.optimize.OccurenceOrderPlugin()
	])
}