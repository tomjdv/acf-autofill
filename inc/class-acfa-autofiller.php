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
        wp_enqueue_script( 'acfa-field-handler', PLUGIN_BASE_DIR . '/public/js/fieldHandler.js', array( 'acf', 'acfa-data' ), time(), false );
    }
}
