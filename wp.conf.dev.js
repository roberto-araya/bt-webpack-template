const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	target: 'web',
	mode: 'development',
	devtool: 'source-map',
	
	entry: path.join(__dirname, '/src/app/index.js'),

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},

	devServer: {
		port: 9000, 
		contentBase: path.join(__dirname, 'src/public'),
		watchContentBase: true,
        watchOptions: {
            poll: true
		}
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
			test: /\.(tga|gltf|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg|otf)$/i,
			use: [{
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'assets/[name].[ext]'
				},
			}]
		},
		{
			test: /\.(jpe?g|png|gif|svg)$/i,
			use: [{
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'assets/images/[hash].[ext]'
				},
			}]
		},
		{
			test: /\.(otf)$/i,
			use: [{
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'assets/fonts/[hash].[ext]'
				},
			}]
		}		
	]},

	optimization: {
		minimize: false
    },
    
  	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/src/public/index.html',
			inject: 'body',
			favicon: './src/public/assets/images/favicon.png'
		}),

		new BundleAnalyzerPlugin({
			analyzerPort: 8890
		}),

		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
};
