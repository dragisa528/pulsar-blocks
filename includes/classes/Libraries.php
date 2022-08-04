<?php
/**
 * Library registration and management.
 *
 * @package PulsarToolkit
 */

namespace PulsarToolkit;

use PulsarToolkit\Contracts\Bootable;

/**
 * Libraries class.
 */
class Libraries implements Bootable {

	/**
	 * Constructor.
	 */
	public function boot() {
		add_action( 'wp_enqueue_scripts', [ $this, 'register' ] );
	}

	/**
	 * Registers the libraries.
	 */
	public function register() {

		wp_register_script(
			'alpine',
			PULSAR_TOOLKIT_LIBRARIES . 'alpinejs.js',
			[],
			$this->get_version( 'alpinejs' ),
			true
		);

		wp_register_script(
			'splide',
			PULSAR_TOOLKIT_LIBRARIES . 'splidejs.js',
			[],
			$this->get_version( '@splidejs/splide' ),
			true
		);
	}

	/**
	 * Check package.json for the version number of this library.
	 * Library versions should be locked to specific versions to avoid issues.
	 *
	 * @param $package_name The name of the package from package.json
	 * @return mixed
	 */
	public function get_version( $package_name ) {

		$package_json = (array) json_decode( file_get_contents( PULSAR_TOOLKIT_PATH . 'package.json' ), true );

		return $package_json['dependencies'][ $package_name ] ?? false;
	}
}
