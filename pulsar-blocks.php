<?php
/**
 * Plugin Name:       Pulsar Blocks
 * Description:       A collection of blocks for the pulsar theme.
 * Requires at least: 5.9
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            eighteen73
 * License:           MIT
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pulsar-blocks
 *
 * @package Pulsar\Blocks
 */

namespace Pulsar\Blocks;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 * @throws \Exception If no template file is found
 */
function register() {
	$blocks_directory = __DIR__ . '/build/';

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
			$block_options['render_callback'] = function ( $attributes, $content, $block_instance ) use ( $block_name ) {

				/**
				 * Keeping the markup to be returned in a separate file is sometimes better, especially if there is very complicated markup.
				 * All of passed parameters are still accessible in the file.
				 */
				ob_start();
				require locate_block_template( $block_name );
				return ob_get_clean();
			};

			register_block_type( $block_folder, $block_options );
		}
	}
}
add_action( 'init', __NAMESPACE__ . '\\register' );

/**
 * Locate the template file for a block.
 * Searches in a child theme, followed by parent theme and lastly the plugin.
 *
 * @param string $block_name The name of the block directory to search for.
 * @return string
 */
function locate_block_template( $block_name ) {

	// The template name to search for.
	$template_file_name = 'template.php';

	// Check the child/parent theme for the template first.
	$template_path = locate_template( "blocks/{$block_name}/{$template_file_name}" );

	// If no template was found in the theme, load it from the plugin instead.
	if ( ! $template_path ) {
		$template_path = plugin_dir_path( __FILE__ ) . "build/{$block_name}/{$template_file_name}";
	}

	return $template_path;
}
