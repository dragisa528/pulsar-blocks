/**
 * WordPress dependencies
 */
import {
	RichText,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useEffect } from "@wordpress/element";
import { __ } from '@wordpress/i18n';

import './editor.css';

const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/buttons' ];

/**
 * The save function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.clientId
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @return {WPElement} Element to render.
 */
export default function Edit( { clientId, attributes: { title, id }, setAttributes } ) {

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: "wp-block-pulsar-accordion-item__content"
		},
		{
			orientation: "vertical",
			allowedBlocks: ALLOWED_BLOCKS,
			renderAppender: () => <InnerBlocks.ButtonBlockAppender />,
		}
	);

	// Set the ID.
	useEffect(() => {
		id === '' &&
		setAttributes({ id: clientId });

        // Listen for a click on the block. If its the richtext element, disable open/close.
        const element = document.querySelector( `#block-${clientId}` );
        element.addEventListener( 'click', function(e) {
            if(e.target.classList.contains('wp-block-pulsar-accordion-item__text')) {
                e.preventDefault();
            }
        } );
	}, []);

	return (
		<details
			{ ...blockProps }
		>
			<summary className="wp-block-pulsar-accordion-item__title">
				<div
					className="wp-block-pulsar-accordion-item__button"
				>
					<RichText
						tagName="span"
						className="wp-block-pulsar-accordion-item__text"
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						onChange={ (title) => setAttributes( { title } ) }
						value={ title }
						placeholder={ __( 'Add a title...' ) }
					/>

					<span
						className="wp-block-pulsar-accordion-item__icon wp-block-pulsar-accordion-item__icon--open"
						aria-hidden="true"
						dangerouslySetInnerHTML={{__html: '&plus;'}}
					>
					</span>

					<span
						className="wp-block-pulsar-accordion-item__icon wp-block-pulsar-accordion-item__icon--close"
						aria-hidden="true"
						dangerouslySetInnerHTML={{__html: '&minus;'}}
					>
					</span>
				</div>
			</summary>

			<div className="wp-block-pulsar-accordion-item__container">
				<div { ...innerBlocksProps }></div>
			</div>
		</details>
	);
}
