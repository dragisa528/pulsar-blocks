/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { SVG, Path, Polygon, G, Rect } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.css';

/**
 * Internal dependencies
 */
import json from './block.json';
import Edit from './edit';

const { name } = json;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( name, {
	...json,

	icon: (
		<SVG className="icon-carousel" width="26px" height="18px" viewBox="0 0 26 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
			<G strokeWidth="1">
				<G transform="translate(0.000000, -3.000000)">
					<Path d="M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z" fillRule="nonzero"></Path>
					<Polygon fillRule="nonzero" points="15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"></Polygon>
					<Rect x="7" y="9" width="12" height="1"></Rect>
					<Rect x="7" y="7" width="12" height="1"></Rect>
					<Polygon transform="translate(24.500000, 12.000000) rotate(-270.000000) translate(-24.500000, -12.000000) " points="24.5 10.5 27.5 13.5 21.5 13.5"></Polygon>
					<Polygon transform="translate(1.500000, 12.000000) rotate(-90.000000) translate(-1.500000, -12.000000) " points="1.5 10.5 4.5 13.5 -1.5 13.5"></Polygon>
				</G>
			</G>
		</SVG>
	),

	/**
	 * @see ./edit.js
	 */
	edit: Edit,
} );
