/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_INNER_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/buttons',
	'core/quote',
];

import Media from './components/media';

export default function Edit({ attributes, setAttributes, noticeUI }) {
	const { media } = attributes;

	const blockProps = useBlockProps({
		className: 'splide__slide flex',
	});

	const onSelectMedia = (media) => {
		setAttributes({ media });
	};

	const removeMedia = (media) => {
		setAttributes({ media: undefined });
	};

	const onUploadError = (err) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(err);
	};

	return (
		<div {...blockProps}>
			<div className="relative flex flex-col w-full">
				<Media
					media={media}
					onSelectMedia={onSelectMedia}
					removeMedia={removeMedia}
					noticeUI={noticeUI}
					onUploadError={onUploadError}
				></Media>
				{media && (
					<div className="relative z-10 flex slide-inner-blocks">
						<div className="container relative z-10 flex items-center ">
							<div className="prose md:prose-lg max-w-none slide-inner-blocks-padding">
								<InnerBlocks
									allowedBlocks={ALLOWED_INNER_BLOCKS}
									renderAppender={() => (
										<InnerBlocks.ButtonBlockAppender />
									)}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
