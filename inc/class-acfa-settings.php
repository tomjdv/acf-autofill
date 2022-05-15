<?php
/**
 * ACFA_Settings starts the plugin.
 * 
 * @package acfa
 */

class ACFA_Settings {
    public $version;

    public function __construct() {
        $this->version = '0.1.0';
    }

    public function initialize() {
        add_action( 'admin_init', array( $this, 'add_autofill_data_settings' ) );
        add_action( 'admin_menu', array( $this, 'acfa_settings_page' ) );
    }

    public function add_autofill_data_settings() {
        $this->add_settings_section();
    }

    public function acfa_settings_page() {
        add_menu_page(
            'ACF Autofill',
            'ACFA Settings',
            'manage_options',
            'acfa',
            array( $this, 'acfa_settings_page_html' )
        );
    }

    public function autofill_data_callback( $args ) {
        ?>
        <p id="<?php echo esc_attr( $args['id'] ); ?>">
            <?php esc_html_e( 'Some fields, like images, require some manually selected data to autofill. Please provide this data here.', 'acfa' ); ?>
        </p>
        <?php
    }

    public function acfa_settings_page_html() {
        if ( ! current_user_can( 'manage_options' ) ) return;
     
        if ( isset( $_GET['settings-updated'] ) ) {
            add_settings_error(
                'acfa_messages',
                'acfa_message',
                __( 'Settings saved', 'acfa' ),
                'updated'
            );
        }
     
        settings_errors( 'acfa_messages' );
        ?>
        <div class="wrap">
            <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
            <form action="options.php" method="post">
                <?php
                do_settings_sections( 'acfa' );
                settings_fields( 'acfa' );
                submit_button( 'Save settings' );
                ?>
            </form>
        </div>
        <?php
    }

    public function add_settings_section() {
        register_setting( 'acfa', 'small_image_id' );
        register_setting( 'acfa', 'medium_image_id' );
        register_setting( 'acfa', 'large_image_id' );

        add_settings_section(
            'autofill_data_settings',
            __( 'Autofill Data', 'acfa' ),
            array( $this, 'autofill_data_callback' ),
            'acfa'
        );

        add_settings_field(
            'acfa_small_image',
            __( 'Small Image', 'acfa' ),
            array( $this, 'acfa_field_small_image_callback' ),
            'acfa',
            'autofill_data_settings',
            array(
                'label_for' => 'acfa_small_image_url',
                'class'     => 'acfa_small_image_url',
            )
        );

        add_settings_field(
            'acfa_medium_image',
            __( 'Medium Image', 'acfa' ),
            array( $this, 'acfa_field_medium_image_callback' ),
            'acfa',
            'autofill_data_settings',
            array(
                'label_for' => 'acfa_medium_image_url',
                'class'     => 'acfa_medium_image_url',
            )
        );

        add_settings_field(
            'acfa_large_image',
            __( 'Large Image', 'acfa' ),
            array( $this, 'acfa_field_large_image_callback' ),
            'acfa',
            'autofill_data_settings',
            array(
                'label_for' => 'acfa_large_image_url',
                'class'     => 'acfa_large_image_url',
            )
        );
    }

    public function acfa_field_small_image_callback( $args ) {
        $small_image_id  = get_option( 'small_image_id' );
        $small_image_url = wp_get_attachment_image_url( $small_image_id );

        wp_enqueue_media();
        ?>
        <div class="image-preview-wrapper">
            <img id="small-image-preview" src="<?php echo $small_image_url ?? '';?>" width="100" height="100" style="max-height: 100px; width: 100px;">
        </div>
        <input id="upload_small_image_button" type="button" class="button" value="<?php _e( 'Upload image' ); ?>" />
        <input type="hidden" name="small_image_id" id="small_image_id" value="<?php echo $small_image_id ?? ''; ?>">
        <?php
    }

    public function acfa_field_medium_image_callback( $args ) {
        $medium_image_id  = get_option( 'medium_image_id' );
        $medium_image_url = wp_get_attachment_image_url( $medium_image_id );

        wp_enqueue_media();
        ?>
        <div class="image-preview-wrapper">
            <img id="medium-image-preview" src="<?php echo $medium_image_url ?? '';?>" width="100" height="100" style="max-height: 100px; width: 100px;">
        </div>
        <input id="upload_medium_image_button" type="button" class="button" value="<?php _e( 'Upload image' ); ?>" />
        <input type="hidden" name="medium_image_id" id="medium_image_id" value="<?php echo $medium_image_id ?? ''; ?>">
        <?php
    }

    public function acfa_field_large_image_callback( $args ) {
        $large_image_id  = get_option( 'large_image_id' );
        $large_image_url = wp_get_attachment_image_url( $large_image_id );

        wp_enqueue_media();
        ?>
        <div class="image-preview-wrapper">
            <img id="large-image-preview" src="<?php echo $large_image_url ?? '';?>" width="100" height="100" style="max-height: 100px; width: 100px;">
        </div>
        <input id="upload_large_image_button" type="button" class="button" value="<?php _e( 'Upload image' ); ?>" />
        <input type="hidden" name="large_image_id" id="large_image_id" value="<?php echo $large_image_id ?? ''; ?>">
        <?php
    }
}
