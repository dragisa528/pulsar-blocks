const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const { basename, dirname, resolve } = require( 'path' );

const libraries = {
	'alpinejs': {
		import: './node_modules/alpinejs/builds/cdn.js',
		filename: 'libraries/alpinejs.js'
	},
}

module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
		...libraries,
	},
	output: {
		filename: '[name].js',
		path: resolve( process.cwd(), 'build' ),
	},
}
