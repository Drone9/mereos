const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './index.js', 
	output: {
		filename: 'bundle.js',  
		path: path.resolve(__dirname, 'dist'),  
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/, 
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					require.resolve('css-loader')
				]
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				type: 'asset/resource', 
			},
			{
				test: /\.js$/,
				exclude: /node_modules/, 
				use: {
					loader: 'babel-loader', 
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
};
