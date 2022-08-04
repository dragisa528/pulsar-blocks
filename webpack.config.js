const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

const libraries = {
	'alpinejs': {
		import: './node_modules/alpinejs/dist/cdn.min.js',
		filename: 'packages/alpinejs.js'
	},
	'splidejs': {
		import: './node_modules/@splidejs/splide/dist/js/splide.min.js',
		filename: 'packages/splidejs.js'
	},
}

module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
		...libraries,
	}
}
