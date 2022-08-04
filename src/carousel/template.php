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
 * @package PulsarToolkit
 * @version 0.1.0
 */

?>
<section <?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'splide' ] ) ); ?>>
	<div class="splide__track">
		<div class="splide__list">
			<?php echo $content; ?>
		</div>
	</div>
</section>
