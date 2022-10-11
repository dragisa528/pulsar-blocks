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
						name={__('Replace', '')}
						onSelect={props.onSelectMedia}
						onError={props.onUploadError}
						accept="image/*"
						allowedTypes={ALLOWED_MEDIA_TYPES}
						mediaId={media.id}
						mediaURL={media.url}
					/>
					<ToolbarButton onClick={props.removeMedia}>
						{__('Remove', 'pulsar')}
					</ToolbarButton>
				</BlockControls>
			)}

			{media && (
				<>
					<img
						src={media.url}
						alt={media.alt}
						className={`absolute object-cover w-full h-full rounded-3xl`}
					/>
					{isBlobURL(media) && <Spinner />}
				</>
			)}
		</>
	);
}

export default Media;
