<?php
/**
 * ACFA_Autofiller starts the plugin.
 * 
 * @package acfa
 */

class ACFA_Autofiller {
    public function __construct() {
        // Do nothing for now
    }

    public function initialize() {
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
    }

    public function enqueue_scripts() {
        wp_enqueue_script( 'acfa-data', PLUGIN_BASE_DIR . '/public/js/data.js', array(), time(), false );
        wp_enqueue_script( 'acfa-helpers', PLUGIN_BASE_DIR . '/public/js/helpers.js', array( 'acfa-data' ), time(), false );
        wp_enqueue_script( 'acfa-media-upload', PLUGIN_BASE_DIR . '/public/js/mediaUpload.js', array( 'jquery' ), time(), false );
        wp_enqueue_script( 'acfa-field-handler', PLUGIN_BASE_DIR . '/public/js/fieldHandler.js', array( 'acf', 'acfa-data' ), time(), false );
        
        $small_image_id  = get_option( 'small_image_id' );
        $medium_image_id = get_option( 'medium_image_id' );
        $large_image_id  = get_option( 'large_image_id' );

        $script_params = array(
            'smallImageID'   => $small_image_id ?? '',
            'mediumImageID'  => $medium_image_id ?? '',
            'largeImageID'   => $large_image_id ?? '',
            'smallImageURL'  => wp_get_attachment_image_url( $small_image_id ?? '', 'thumbnail' ) ?? '',
            'mediumImageURL' => wp_get_attachment_image_url( $medium_image_id, 'medium' ) ?? '',
            'largeImageURL'  => wp_get_attachment_image_url( $large_image_id, 'large' ) ?? '',
        );

        wp_localize_script( 'acfa-media-upload', 'scriptParams', $script_params );
        wp_localize_script( 'acfa-field-handler', 'scriptParams', $script_params );
    }
}
