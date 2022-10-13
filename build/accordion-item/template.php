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
<div <?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'splide__slide' ] ) ); ?>>
	<div class="wp-block-pulsar-carousel-slide__container">
		<?php if ( isset( $attributes['media']['id'] ) ) : ?>
			<?php echo wp_get_attachment_image( $attributes['media']['id'], 'large', false, [ 'class' => 'wp-block-pulsar-carousel-slide__image' ] ); ?>
		<?php endif; ?>

		<?php if ( $content ) : ?>
			<div class="wp-block-pulsar-carousel-slide__content">
				<?php echo $content; ?>
			</div>
		<?php endif; ?>
	</div>
</div>
