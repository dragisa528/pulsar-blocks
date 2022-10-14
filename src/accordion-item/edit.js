/**
 * WordPress dependencies
 */
import {
	RichText,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
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

	// Store the Client ID as the id.
	// setAttributes({ id: clientId });

	window.accordionItem = function() {
		return {
			id: id,
			get expanded() {
				return this.active === this.id
			},
			set expanded(value) {
				this.active = value ? this.id : null
			}
		}
	}

	return (
		<div
			{ ...blockProps }
			x-data="accordionItem()"
			role="region"
		>
			<h2 className="wp-block-pulsar-accordion-item__title">
				<button
					className="wp-block-pulsar-accordion-item__button"
					{...{
						"x-on:click": "expanded = !expanded",
						":aria-expanded": "expanded"
					}}
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
						className="wp-block-pulsar-accordion-item__icon"
						x-show="expanded"
						aria-hidden="true"
						dangerouslySetInnerHTML={{__html: '&minus;'}}
					>
					</span>

					<span
						className="wp-block-pulsar-accordion-item__icon"
						x-show="!expanded"
						aria-hidden="true"
						dangerouslySetInnerHTML={{__html: '&plus;'}}
					>
					</span>
				</button>
			</h2>

			<div className="wp-block-pulsar-accordion-item__container" x-show="expanded">
				<div { ...innerBlocksProps }></div>
			</div>
		</div>
	);
}
