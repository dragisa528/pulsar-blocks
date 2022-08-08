const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/**
 * Our custom packages we want to make available to WordPress.
 * They should be copied from node_modules, and use
 * the distribution file for the package.
 */
const packages = [
	{
		from: './node_modules/alpinejs/dist/cdn.min.js',
		to: 'packages/alpine.js',
	},
	{
		from: './node_modules/@splidejs/splide/dist/js/splide.min.js',
		to: 'packages/splide.js',
	},
];

/**
 * Map our custom packages.
 *
 * @param {string} request Requested module
 *
 * @return {(string|undefined)} Script global
 */
function requestToHandle(request) {
	if (request === 'alpinejs') {
		return 'alpine';
	}

	if (request === '@splidejs/splide') {
		return 'splide';
	}
}

/**
 * Externalize our custom packages.
 *
 * @param {string} request Requested module
 *
 * @return {(string|undefined)} Script global
 */
function requestToExternal(request) {
	if (request === 'alpinejs') {
		return 'Alpine';
	}

	if (request === '@splidejs/splide') {
		return 'Splide';
	}
}

module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
	},
	plugins: [
		...defaultConfig.plugins.filter(
			(plugin) =>
				plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
		),
		new DependencyExtractionWebpackPlugin({
			requestToExternal,
			requestToHandle,
		}),
		new CopyPlugin({
			patterns: packages,
		}),
	],
};
