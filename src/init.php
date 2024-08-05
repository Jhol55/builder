<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function multi_block_cgb_block_assets() {
	wp_enqueue_script(
		'multi_block-cgb-frontend-js',
		plugins_url( 'dist/frontend.build.js', dirname( __FILE__ ) ),
		array( 'wp-element' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/frontend.build.js' ),
		true
	);
	wp_enqueue_style(
		'multi_block-cgb-frontend-css',
		plugins_url( 'dist/frontend.css', dirname( __FILE__ ) ),
		array(),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/frontend.css' )
	);
} // End function multi_block_cgb_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'multi_block_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function multi_block_cgb_editor_assets() {
	wp_enqueue_script(
		'multi_block-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ) // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ) // Version: File modification time.
	);
	wp_enqueue_style(
		'multi_block-cgb-block-editor-css',
		plugins_url( 'dist/blocks.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.css' )
	);
} // End function multi_block_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'multi_block_cgb_editor_assets' );
