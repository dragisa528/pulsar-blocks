import { __ } from '@wordpress/i18n';
import {
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { Spinner, ToolbarButton } from '@wordpress/components';

const ALLOWED_MEDIA_TYPES = ['image'];

function Media(props) {
	const { media } = props;

	return (
		<>
			<MediaPlaceholder
				onSelect={props.onSelectMedia}
				allowedTypes="image"
				accept="image/*"
				mediaId={media ? media.id : undefined}
				value={media ? media : undefined}
				notices={props.noticeUI}
				disableMediaButtons={media ? true : false}
			/>

			{media && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__('Replace Media', '')}
						onSelect={props.onSelectMedia}
						onError={props.onUploadError}
						accept="image/*"
						allowedTypes={ALLOWED_MEDIA_TYPES}
						mediaId={media.id}
						mediaURL={media.url}
					/>
					<ToolbarButton onClick={props.removeMedia}>
						{__('Remove Media', 'lodgefarmkitchen-blocks')}
					</ToolbarButton>
				</BlockControls>
			)}

			{media && (
				<div
					className={`slide-media  w-full ${
						isBlobURL(media.url) ? ' is-loading' : ''
					}`}
				>
					<img
						src={media.url}
						alt={media.alt}
						className={`absolute top-0 left-0 w-full h-full object-cover`}
					/>
					{isBlobURL(media) && <Spinner />}
				</div>
			)}
		</>
	);
}

export default Media;
