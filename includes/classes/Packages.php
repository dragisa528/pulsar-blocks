<?php
/**
 * Packages registration and management.
 *
 * @package PulsarToolkit
 */

namespace PulsarToolkit;

use PulsarToolkit\Contracts\Bootable;

/**
 * Packages class.
 */
class Packages implements Bootable {

	/**
	 * Packages to register for admin and the front end.
	 * Should be in the format `handle` (reference when enqueueing) => `package_name`
	 * (the name of the package when running npm i package_name).
	 *
	 * @var array
	 */
	public $packages = [
		'alpine' => 'alpinejs',
		'splide' => '@splidejs/splide',
	];

	/**
	 * Constructor.
	 */
	public function boot() {
		add_action( 'wp_enqueue_scripts', [ $this, 'register' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_register' ] );
	}

	/**
	 * Registers the packages.
	 */
	public function register() {

		foreach ( $this->packages as $handle => $package_name ) {

			wp_register_script(
				$handle,
				PULSAR_TOOLKIT_URL . "build/packages/{$handle}.js",
				[],
				$this->get_version( $package_name ),
			);
		}
	}

	/**
	 * Registers the packages.
	 */
	public function admin_register() {

		foreach ( $this->packages as $handle => $package_name ) {

			wp_register_script(
				$handle,
				PULSAR_TOOLKIT_URL . "build/packages/{$handle}.js",
				[],
				$this->get_version( $package_name ),
			);
		}
	}

	/**
	 * Check package.json for the version number of this script.
	 * Package versions should be locked to specific versions to avoid issues.
	 *
	 * @param $package_name The name of the package from package.json
	 * @return mixed
	 */
	public function get_version( $package_name ) {

		$package_json = (array) json_decode( file_get_contents( PULSAR_TOOLKIT_PATH . 'package.json' ), true );

		return $package_json['dependencies'][ $package_name ] ?? false;
	}
}
