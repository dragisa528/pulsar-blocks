<?php
/**
 * This template can be overridden by copying it to yourtheme/blocks/blockname/template.php.
 *
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes     The array of attributes for this block.
 * @param string   $content        Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
 *
 * @package Pulsar
 */

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'splide__slide w-full flex h-[400px] lg:h-[700px]' ] ) ); ?>>
	<div class="relative flex flex-col w-full">
		<?php if ( isset( $attributes['media']['id'] ) ) : ?>
			<?php if ( $attributes['media']['id'] === 0 ) : ?>
				<img src="<?php echo esc_url( get_theme_file_uri( 'assets/img/placeholder.png' ) ); ?>" alt="Placholder Image" class="absolute object-cover w-full h-full roundex-3xl">
			<?php else : ?>
				<?php echo wp_get_attachment_image( $attributes['media']['id'], 'large', false, [ 'class' => 'absolute object-cover w-full h-full rounded-3xl' ] ); ?>
			<?php endif; ?>
		<?php endif; ?>
		<?php if ( $content ) : ?>
			<div class="relative z-10 flex h-full px-4 lg:px-10 py-20">
				<div class="splide__content container relative z-10 flex flex-col justify-center items-center text-white">
					<?php echo $content; ?>
				</div>
			</div>
		<?php endif; ?>
	</div>
</div>
