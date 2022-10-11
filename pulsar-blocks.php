<?php
/**
 * Plugin Name:       Pulsar Blocks
 * Description:       A collection of blocks for use with the Pulsar theme.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            eighteen73
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pulsar
 *
 * @package           pulsar
 */

// Useful global constants.
define( 'PULSAR_BLOCKS_URL', plugin_dir_url( __FILE__ ) );
define( 'PULSAR_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function pulsar_blocks_register() {
	$blocks_directory = trailingslashit( PULSAR_BLOCKS_PATH . 'build' );

	// Register all the blocks in the theme
	if ( file_exists( $blocks_directory ) ) {
		$block_json_files = glob( $blocks_directory . '*/block.json' );

		// Auto register all blocks that were found.
		foreach ( $block_json_files as $filename ) {

			$block_folder = dirname( $filename );
			$block_name   = basename( dirname( $filename ) );

			$block_options = [];

			// Get block template file.
			$template_file_path = $block_folder . '/template.php';

			if ( ! file_exists( $template_file_path ) ) {
				throw new \Exception( 'Blocks are assumed to be dynamic. Make sure a template.php file is present for each block.' );
			}

			// only add the render callback if the block has a file called template.php in it's directory
			$block_options['render_callback'] = function ( $attributes, $content, $block_instance ) use ( $block_name, $block_folder ) {

				/**
				 * Keeping the markup to be returned in a separate file is sometimes better, especially if there is very complicated markup.
				 * All of passed parameters are still accessible in the file.
				 */
				ob_start();
				require plugin_dir_path( $block_folder ) . $block_name . '/template.php';
				return ob_get_clean();
			};

			register_block_type( $block_folder, $block_options );
		}
	}
}
add_action( 'init', 'pulsar_blocks_register' );
