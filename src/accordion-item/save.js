/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const Save = ( { attributes: { title } } ) => {
	const blockProps = useBlockProps.save();

	return (
		<div
			{ ...blockProps }
			role="region"
		>
			<h2 className="wp-block-pulsar-accordion-item__title">
				<button
					className="wp-block-pulsar-accordion-item__button"
				>
					<RichText.Content
						{ ...blockProps }
						tagName="p"
						className="wp-block-pulsar-accordion-item__text"
						value={ title }
					/>

					<span
						className="wp-block-pulsar-accordion-item__icon"
					>
						&minus;
					</span>

					<span
						className="wp-block-pulsar-accordion-item__icon"
					>
						&plus;
					</span>
				</button>
			</h2>

			<div className="wp-block-pulsar-accordion-item__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
