<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes     The array of attributes for this block.
 * @param string   $content        Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
 *
 * @package Pulsar
 */

?>

<?php if ( isset( $attributes['title'] ) ) : ?>
	<div
		<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
		x-data="{
			id: 1,
			get expanded() {
				return this.active === this.id
			},
			set expanded(value) {
				this.active = value ? this.id : null
			},
		}"
		role="region"
	>
		<h2 class="wp-block-pulsar-accordion-item__title">
			<button
				x-on:click="expanded = !expanded"
				:aria-expanded="expanded"
				class="wp-block-pulsar-accordion-item__button"
			>
				<span class="wp-block-pulsar-accordion-item__text"><?php echo esc_html( $attributes['title'] ); ?></span>
				<span class="wp-block-pulsar-accordion-item__icon" x-show="expanded" aria-hidden="true">&minus;</span>
				<span class="wp-block-pulsar-accordion-item__icon" x-show="!expanded" aria-hidden="true">&plus;</span>
			</button>
		</h2>

		<div class="wp-block-pulsar-accordion-item__content" x-show="expanded">
			<?php echo $content; ?>
		</div>
	</div>
<?php endif; ?>
