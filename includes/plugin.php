<?php
/**
 * Bootstrap all of the plugin classes.
 *
 * @package PulsarToolkit
 */

namespace PulsarToolkit;

/**
 * Mini container.  This allows us to set up single instances of our objects
 * without using the singleton pattern and gives third-party devs easy access to
 * the objects if they need to unhook actions/filters added by the classes.
 *
 * @access public
 * @param  string $abstract
 * @return mixed
 */
function plugin( string $abstract = '' ) {
	static $classes = null;

	// On first run, create new components and boot them.
	if ( is_null( $classes ) ) {
		$bindings = [
			\PulsarToolkit\Blocks::class,
			\PulsarToolkit\Packages::class,
		];

		foreach ( $bindings as $binding ) {
			$classes[ $binding ] = new $binding();
			$classes[ $binding ]->boot();
		}
	}

	return $abstract ? $classes[ $abstract ] : $classes;
}

/**
 * Bootstrap plugin.
 * Run a small bootstrapping routine.
 */
do_action( 'pulsar_toolkit/booted', plugin() );
