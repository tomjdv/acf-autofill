class fieldHandler {
    constructor() {
        this.data = data;
    }

    handle_field(data, type) {
        switch (type) {
            case 'checkbox':
                // TODO, low priority
                this.checkbox_field_handler(data);
                break;
            case 'group':
                // TODO, tough one
                this.group_field_handler(data);
                break;
            case 'image':
                // TODO
                this.image_field_handler(data);
                break;
            case 'link':
                this.link_field_handler(data);
                break;
            case 'number':
                // TODO, low priority
                this.number_field_handler(data);
                break;
            case 'radio':
                // TODO
                this.radio_field_handler(data);
                break;
            case 'repeater':
                // TODO
                this.repeater_field_handler(data);
                break;
            case 'relationship':
                // TODO
                this.relationship_field_handler(data);
                break;
            case 'select':
                // TODO
                this.select_field_handler(data);
                break;
            case 'text':
                this.text_handler(data);
                break;
            case 'textarea':
                this.textarea_field_handler(data);
                break;
            case 'true_false':
                // TODO, low priority
                this.true_false_field_handler(data);
                break;
            case 'wysiwyg':
                // TODO
                this.wysiwyg_field_handler(data);
                break;
            default:
                console.log("Unknown field type");
                break;
        }
    }
    
    checkbox_field_handler(data) {
        console.log("Found a checkbox field!");
    }

    group_field_handler(data) {
        console.log("Found a group field!");
        console.dir(data);
    }
    
    image_field_handler(data) {
        const theField = acf.getField(data.key);

        if (theField.val()) return;

        const name = data.name;

        // Check for the standard images set in the options
        const smallImage = {
            url: scriptParams.smallImageURL,
            ID: scriptParams.smallImageID
        };
        const mediumImage = {
            url: scriptParams.mediumImageURL,
            ID: scriptParams.mediumImageID
        };
        const largeImage = {
            url: scriptParams.largeImageURL,
            ID: scriptParams.largeImageID
        };
        let image = undefined;

        switch (name) {
            case 'small-image':
                image = smallImage || undefined;
                break;
            case 'medium-image':
                image = mediumImage || smallImage;
                break;
            case 'large-image':
            case 'featured-image':
            case 'header-image':
                image = largeImage || mediumImage || smallImage;
                break;
            default:
                break;
        }

        if (! image) {
            console.error('No image data found.');
            return;
        }

        // Set image ID
        theField.setValue(image.ID);

        // Set the URL
        document.querySelector(`[data-key="${data.key}"] img`).src = image.url;
        
        // Show the image field
        document.querySelector(`[data-key="${data.key}"] .acf-image-uploader`).classList.add('has-value');
    }
    
    link_field_handler(data) {
        const theField = acf.getField(data.key);
        
        if (theField.val()) return;

        const name = data.name;
        const linkData = this.data.link;        

        let randomLink = Helpers.getRandomFromArray(linkData.external);

        switch (name) {
            case 'external-link':
                randomText = Helpers.getRandomFromArray(linkData.external);
            case 'internal-link':
                randomText = Helpers.getRandomFromArray(linkData.internal);
            case 'read-more':
                randomText = Helpers.getRandomFromArray(linkData.internal);  
            default:
                break;
        }

        theField.setValue(randomLink);
    }

    number_field_handler(data) {
        console.log("Found a number field!");
    }

    radio_field_handler(data) {
        console.log("Found a radio field!");
    }

    relationship_field_handler(data) {
        console.log("Found a relationship field!");
    }

    repeater_field_handler(data) {
        console.log("Found a repeater field!");
    }

    select_field_handler(data) {
        console.log("Found a select field!");
    }

    text_handler(data) {
        const theField = acf.getField(data.key);

        if(theField.val()) return;

        const name = data.name;
        const textData = this.data.text;        

        let randomText = Helpers.getRandomFromArray(textData.random);

        switch (name) {
            case 'name':
                randomText = Helpers.getRandomFromArray(textData.names);
            case 'testimonial':
                randomText = Helpers.getRandomFromArray(textData.testimonials);
            case 'quote':
                randomText = Helpers.getRandomFromArray(textData.quotes);
            case 'address':
                randomText = Helpers.getRandomFromArray(textData.addresses);
            case 'zipcode':
                randomText = Helpers.getRandomFromArray(textData.zipcodes);
            case 'city':
                randomText = Helpers.getRandomFromArray(textData.cities);
            default:
                break;
        }

        theField.setValue(randomText);
    }

    textarea_field_handler(data) {
        const theField = acf.getField(data.key);

        if (theField.val()) return;

        const name = data.name;
        const textareaData = this.data.textarea;        

        let randomText = Helpers.getRandomFromArray(textareaData.random);
        
        switch (name) {
            case 'summary':
                randomText = Helpers.getRandomFromArray(textareaData.summaries);
                break;
            case 'excerpt':
            case 'intro':
                randomText = Helpers.getRandomFromArray(textareaData.excerpts);
                break;
            default:
                break;
        }

        theField.setValue(randomText);
    }

    true_false_field_handler(data) {
        console.log("Found a true false field!");
    }

    wysiwyg_field_handler(data) {
        console.log("Found a wysiwyg field!");
    }
}

const handler = new fieldHandler();

acf.addAction('ready_field', (field) => {
    const data = field.data;
    const type = data.type;

    handler.handle_field(data, type);
});