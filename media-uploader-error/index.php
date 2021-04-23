<?php
/**
 * Plugin Name: Reproduce MediaUpload error
 * Description: Plugin to reproduce the MediaUpload error.
 * Version: 1.0
 * License: GPL2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

add_action( 'plugins_loaded', function() {

	// load css
	add_action( 'enqueue_block_editor_assets', function ( $hook_suffix ) {
		wp_enqueue_style( 'test-blocks-editor', plugins_url( '/css/block.css', __FILE__ ), [], date_i18n( 'mdGis' ) );
	});

	// register blocks
	add_action( 'init', function () {
		$blocks = [
			'test',
		];
		foreach ( $blocks as $name ) {
			register_block_type_from_metadata(
				plugin_dir_path( __FILE__ ) . 'src/blocks/' . $name
			);
		}
	});
} );
