const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	target: 'web',
	mode: 'production',

	entry: path.join(__dirname, '/src/app/index.js'),

	output: {
		filename: '[hash].bundle.js'
	},

	module: {  
    	rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [{
					loader: 'babel-loader',
					options: {
          				presets: ['@babel/preset-env']
        			}
				}, 'eslint-loader']
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(tga|gltf|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							limit: 10000,
							name: 'assets/[hash].[ext]'
						},
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							limit: 10000,
							name: 'assets/images/[hash].[ext]'
						},
					}
				]
			},
			{
				test: /\.(otf)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							limit: 10000,
							name: 'assets/fonts/[hash].[ext]'
						},
					}
				]
			}
		]},

	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false
			}),
			new OptimizeCSSAssetsPlugin({})
		]
    },
    
  	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: __dirname + "/src/public/index.html",
			filename: 'index.html',
			favicon: './src/public/assets/images/favicon.png'
		}),

		new MiniCssExtractPlugin({
			filename: '[hash].css',
			chunkFilename: '[id].css'
		})
	]
};
