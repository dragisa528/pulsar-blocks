<?php
/**
 * Block registration and management.
 *
 * @package PulsarToolkit
 */

namespace PulsarToolkit;

use PulsarToolkit\Contracts\Bootable;
use function locate_template;

/**
 * Blocks class.
 */
class Blocks implements Bootable {

	/**
	 * Constructor.
	 */
	public function boot() {
		add_action( 'init', [ $this, 'register' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'frontend_scripts' ] );
	}

	/**
	 * Registers the blocks using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 * @throws \Exception If no template file is found
	 */
	public function register() {
		$blocks_directory = trailingslashit( PULSAR_TOOLKIT_PATH . 'build/blocks' );

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
					require $this->locate_template( $block_name );
					return ob_get_clean();
				};

				register_block_type( $block_folder, $block_options );
			}
		}
	}

	public function frontend_scripts() {
		wp_enqueue_script(
			'pulsar-toolkit-carousel',
			PULSAR_TOOLKIT_URL . 'build/blocks/carousel/frontend.js',
			[ 'splide' ],
			null,
			true
		);
	}

	/**
	 * Locate the template file for a block.
	 * Searches in a child theme, followed by parent theme and lastly the plugin.
	 *
	 * @param string $block_name The name of the block directory to search for.
	 * @return string
	 */
	public function locate_template( $block_name ) {

		// The template name to search for.
		$template_file_name = 'template.php';

		// Check the child/parent theme for the template first.
		$template_path = locate_template( "blocks/{$block_name}/{$template_file_name}" );

		// If no template was found in the theme, load it from the plugin instead.
		if ( ! $template_path ) {
			$template_path = PULSAR_TOOLKIT_PATH . "build/blocks/{$block_name}/{$template_file_name}";
		}

		return $template_path;
	}
}
