const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const entries = {};
const blocks = ['test'];
blocks.forEach((key) => {
	entries['blocks/' + key + '/index'] = path.resolve('src', 'blocks/' + key + '/index.js');
});

module.exports = {
	...defaultConfig, //@wordpress/scriptを引き継ぐ

	entry: entries,

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
};
