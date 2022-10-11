/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_INNER_BLOCKS = ['core/heading', 'core/paragraph', 'core/buttons'];

import Media from './components/media';

import './editor.css';

/**
 * The save function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, noticeUI }) {
	const { media } = attributes;

	const blockProps = useBlockProps({
		className: 'splide__slide flex',
	});

	const onSelectMedia = (media) => {
		setAttributes({ media });
	};

	const removeMedia = () => {
		setAttributes({ media: undefined });
	};

	const onUploadError = (err) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(err);
	};

	return (
		<div {...blockProps}>
			<div className="relative flex flex-col items-end w-full h-[700px]">
				<Media
					media={media}
					onSelectMedia={onSelectMedia}
					removeMedia={removeMedia}
					noticeUI={noticeUI}
					onUploadError={onUploadError}
				></Media>
				{media && (
					<div className="container relative z-10 flex flex-col justify-end items-center p-10 h-full">
						<InnerBlocks
							allowedBlocks={ALLOWED_INNER_BLOCKS}
							renderAppender={() => (
								<InnerBlocks.ButtonBlockAppender />
							)}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
