/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/buttons' ];

import Media from './components/media';

import './editor.css';

/**
 * The save function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @param  root0.noticeUI
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes, noticeUI } ) {
	const { media } = attributes;

	const blockProps = useBlockProps( { className: 'splide__slide' } );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-pulsar-carousel-slide__content',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			renderAppender: () => <InnerBlocks.ButtonBlockAppender />,
		}
	);

	const onSelectMedia = ( media ) => {
		setAttributes( { media } );
	};

	const removeMedia = () => {
		setAttributes( { media: undefined } );
	};

	const onUploadError = ( err ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( err );
	};

	return (
		<div { ...blockProps }>
			<div className="wp-block-pulsar-carousel-slide__container">
				<Media
					media={ media }
					onSelectMedia={ onSelectMedia }
					removeMedia={ removeMedia }
					noticeUI={ noticeUI }
					onUploadError={ onUploadError }
				></Media>
				{ media && <div { ...innerBlocksProps }></div> }
			</div>
		</div>
	);
}
