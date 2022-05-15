<?php
/**
 * ACFA_Bootstrap starts the plugin.
 * 
 * @package acfa
 */

class ACFA_Bootstrap {
    public function __construct() {
        add_action( 'init', array( $this, 'initialize_classes' ) );
    }

    public function initialize_classes() {
        require 'class-acfa-autofiller.php';

        $autofiller = new ACFA_Autofiller();
        $autofiller->initialize();

        require 'class-acfa-settings.php';

        $settings = new ACFA_Settings();
        $settings->initialize();
    }
}
