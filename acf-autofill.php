<?php
/**
 * Plugin Name: ACF Autofill
 * Plugin Author: Tom de Visser
 * Description: Make testing your website easier by autofilling ACF fields, giving you more time to actually start testing.
 * Version: 0.1.0
 * 
 * @package acfa
 */

defined( 'ABSPATH' ) or die( 'Not today' );

define( 'PLUGIN_BASE_FILE', __FILE__ );
define( 'PLUGIN_BASE_DIR', plugin_dir_url( __FILE__ ) );

require 'inc' . DIRECTORY_SEPARATOR . 'class-acfa-bootstrap.php';