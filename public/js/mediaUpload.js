jQuery(document).ready( function($) {
    let small_file_frame  = undefined,
        medium_file_frame = undefined,
        large_file_frame  = undefined;

    let wpMediaPostID = wp.media.model.settings.post.id;

    const smallImageID  = scriptParams.smallImageID,
        mediumImageID = scriptParams.mediumImageID,
        largeImageID  = scriptParams.largeImageID;

    jQuery('#upload_small_image_button').on('click', function(event){

        event.preventDefault();

        if (small_file_frame) {
            small_file_frame.uploader.uploader.param('post_id', smallImageID);
            small_file_frame.open();
            return;
        } else {
            wp.media.model.settings.post.id = smallImageID;
        }

        small_file_frame = wp.media.frames.small_file_frame = wp.media({
            title: 'Select a small image placeholder',
            button: {
                text: 'Use this image',
            },
            multiple: false
        });

        small_file_frame.on('select', function() {
            attachment = small_file_frame.state().get('selection').first().toJSON();

            $( '#small-image-preview' ).attr( 'src', attachment.url ).css( 'width', '100px' );
            $( '#small-image-preview' ).attr( 'src', attachment.url ).css( 'height', '100px' );
            $( '#small-image-preview' ).attr( 'src', attachment.url ).css( 'object-fit', 'cover' );
            $( '#small_image_id' ).val( attachment.id );

            wp.media.model.settings.post.id = wpMediaPostID;
        });

        small_file_frame.open();
    });

    jQuery('#upload_medium_image_button').on('click', function(event){

        event.preventDefault();

        if (medium_file_frame) {
            medium_file_frame.uploader.uploader.param('post_id', mediumImageID);
            medium_file_frame.open();
            return;
        } else {
            wp.media.model.settings.post.id = mediumImageID;
        }

        medium_file_frame = wp.media.frames.medium_file_frame = wp.media({
            title: 'Select a medium image placeholder',
            button: {
                text: 'Use this image',
            },
            multiple: false
        });

        medium_file_frame.on('select', function() {
            attachment = medium_file_frame.state().get('selection').first().toJSON();

            $('#medium-image-preview').attr('src', attachment.url).css('width', '100px');
            $('#medium-image-preview').attr('src', attachment.url).css('height', '100px');
            $('#medium-image-preview').attr('src', attachment.url).css('object-fit', 'cover');
            $('#medium_image_id').val( attachment.id );

            wp.media.model.settings.post.id = wpMediaPostID;
        });

        medium_file_frame.open();
    });

    jQuery('#upload_large_image_button').on('click', function(event){

        event.preventDefault();

        if (large_file_frame) {
            large_file_frame.uploader.uploader.param('post_id', largeImageID);
            large_file_frame.open();
            return;
        } else {
            wp.media.model.settings.post.id = largeImageID;
        }

        large_file_frame = wp.media.frames.large_file_frame = wp.media({
            title: 'Select a large image placeholder',
            button: {
                text: 'Use this image',
            },
            multiple: false
        });

        large_file_frame.on('select', function() {
            attachment = large_file_frame.state().get('selection').first().toJSON();

            $('#large-image-preview').attr('src', attachment.url).css('width', '100px');
            $('#large-image-preview').attr('src', attachment.url).css('height', '100px');
            $('#large-image-preview').attr('src', attachment.url).css('object-fit', 'cover');
            $('#large_image_id').val(attachment.id);

            wp.media.model.settings.post.id = wpMediaPostID;
        });

        large_file_frame.open();
    });

    jQuery('a.add_media').on('click', function() {
        wp.media.model.settings.post.id = wpMediaPostID;
    });
});