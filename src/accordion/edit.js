import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import './editor.css';

import Alpine from 'alpinejs';

const ALLOWED_BLOCKS = [ 'pulsar/accordion-item' ];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.clientId
 * @param {Object}   param0.attributes
 * @param {Function} param0.setAttributes
 * @return {WPElement} Element to render.
 */

export default function Edit( { clientId, attributes, setAttributes } ) {

	const blockProps = useBlockProps();

	const TEMPLATE = [
		[ 'pulsar/accordion-item', {},
			[
				[ 'core/paragraph', {} ]
			]
		],
	];

	const innerBlocksProps = useInnerBlocksProps( { className: 'wp-block-pulsar-accordion__items' }, {
		orientation: "vertical",
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		renderAppender: () => <InnerBlocks.ButtonBlockAppender />,
	} );

	window.Alpine = Alpine;

	Alpine.start();

	return (
		<div
			{ ...useBlockProps() }
			x-data="{ active: 1 }"
		>
			<div { ...innerBlocksProps }></div>
		</div>
	);
}
