<?php

/**
 * Plugin Name: q30 Card Block
 * Plugin URI: https://github.com/jhope-q30/q30-card-block
 * Description: This adds card layout/style to any theme q30-card-style
 * Version: 1.0.0
 * Author: jhope@q30design.com
 *
 * @package q30-card-block
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'q30_cb_load_textdomain' );

function q30_cb_load_textdomain() {
	load_plugin_textdomain( 'q30-card-block', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function q30_cb_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'q30-card-block-00',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	wp_register_style(
		'q30-card-block-00-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);

	wp_register_style(
		'q30-card-block-00',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'q30-card-block/q30-card-style', array(
		'style'         => 'q30-card-block-00',
		'editor_style'  => 'q30-card-block-00-editor',
		'editor_script' => 'q30-card-block-00',
	) );

  if ( function_exists( 'wp_set_script_translations' ) ) {
    /**
     * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
     * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
     * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
     */
    wp_set_script_translations( 'q30-card-block-00', 'q30-card-block' );
  }

}
add_action( 'init', 'q30_cb_register_block' );
