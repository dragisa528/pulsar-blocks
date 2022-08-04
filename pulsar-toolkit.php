<?php
/**
 * Plugin Name:       Pulsar Toolkit
 * Description:       A toolkit of useful blocks and libraries.
 * Requires at least: 5.9
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            eighteen73
 * License:           MIT
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pulsar-toolkit
 *
 * @package PulsarToolkit
 */

namespace PulsarToolkit;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Useful global constants.
define( 'PULSAR_TOOLKIT_URL', plugin_dir_url( __FILE__ ) );
define( 'PULSAR_TOOLKIT_PATH', plugin_dir_path( __FILE__ ) );

// Boot the plugin.
require_once PULSAR_TOOLKIT_PATH . 'includes/autoload.php';
require_once PULSAR_TOOLKIT_PATH . 'includes/plugin.php';
