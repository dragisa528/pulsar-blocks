/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_INNER_BLOCKS = ['core/heading', 'core/paragraph', 'core/buttons'];

/**
 * The save function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	const blockProps = useBlockProps({
		className: 'splide__slide',
	});

	return (
		<div {...blockProps}>
			<InnerBlocks
				allowedBlocks={ALLOWED_INNER_BLOCKS}
				renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
			/>
		</div>
	);
}
