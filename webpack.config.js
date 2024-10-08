const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './index.js',  // Entry point
	output: {
		filename: 'bundle.js',  // Output bundle file
		path: path.resolve(__dirname, 'dist'),  // Output directory
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/,  // Matches .css files
				use: [
					MiniCssExtractPlugin.loader,  // Extracts CSS into separate files
					'css-loader'  // Resolves CSS imports
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',  // Output CSS file
		}),
	],
};
