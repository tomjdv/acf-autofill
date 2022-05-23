class fieldHandler {
    constructor() {
        this.data = data;
    }

    handle_field(data, type) {
        switch (type) {
            case 'flexible_content':
                this.flexible_content_field_handler(data);
                break;
            case 'image':
                this.image_field_handler(data);
                break;
            case 'link':
                this.link_field_handler(data);
                break;
            case 'radio':
                this.radio_field_handler(data);
                break;
            case 'repeater':
                this.repeater_field_handler(data);
                break;
            // case 'relationship':
            //     this.relationship_field_handler(data);
            //     break;
            case 'text':
                this.text_handler(data);
                break;
            case 'textarea':
                this.textarea_field_handler(data);
                break;
            default:
                break;
        }
    }

    handle_subfield(data, type) {
        switch (type) {
            case 'image':
                this.image_subfield_handler(data);
                break;
            case 'link':
                this.link_subfield_handler(data);
                break;
            case 'radio':
                this.radio_subfield_handler(data);
                break;
            // case 'relationship':
            //     this.relationship_subfield_handler(data);
            //     break;
            case 'text':
                this.text_subhandler(data);
                break;
            case 'textarea':
                this.textarea_subfield_handler(data);
                break;
            default:
                break;
        }
    }

    flexible_content_field_handler(data) {
        acf.addAction('new_field', (field) => {
            console.log('new field added' + field.data.type);
            this.handle_subfield(field.data, field.data.type);
        });
    }
    
    image_field_handler(data) {
        const theField = acf.getField(data.key);

        if (theField.val()) return;

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

        switch (data.name) {
            case 'avatar':
            case 'small-image':
                image = smallImage || undefined;
                break;
            case 'medium-image':
            case 'card-image':
                image = mediumImage || smallImage;
                break;
            case 'large-image':
            case 'featured-image':
            case 'header-image':
                image = largeImage || mediumImage || smallImage;
                break;
            default:
                image = largeImage || mediumImage || smallImage;
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

    image_subfield_handler(data) {
        const theFields = acf.getFields({key: data.key});
    
        theFields.forEach((field) => {
            if (field.val()) return;

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

            switch (data.name) {
                case 'avatar':
                case 'small-image':
                    image = smallImage || undefined;
                    break;
                case 'medium-image':
                case 'card-image':
                    image = mediumImage || smallImage;
                    break;
                case 'large-image':
                case 'featured-image':
                case 'header-image':
                    image = largeImage || mediumImage || smallImage;
                    break;
                default:
                    image = largeImage || mediumImage || smallImage;
                    break;
            }

            if (! image) {
                console.error('No image data found.');
                return;
            }

            // Set image ID
            field.setValue(image.ID);

            // Set the URL
            const allImgElements = document.querySelectorAll(`[data-key="${data.key}"] img`);
            allImgElements.forEach((el) => {
                el.src = image.url;
            });
            
            // Show the image field
            const allImgUploadElements = document.querySelectorAll(`[data-key="${data.key}"] .acf-image-uploader`);
            allImgUploadElements.forEach((el) => {
                el.classList.add('has-value');
            });
        });
    }
    
    link_field_handler(data) {
        const theField = acf.getField(data.key);
        
        if (theField.val()) return;

        const linkData = this.data.link;        

        let randomLink = Helpers.getRandomFromArray(linkData.external);

        switch (data.name) {
            case 'external-link':
                randomLink = Helpers.getRandomFromArray(linkData.external);
                break;
            case 'internal-link':
                randomLink = Helpers.getRandomFromArray(linkData.internal);
                break;
            case 'read-more':
                randomLink = Helpers.getRandomFromArray(linkData["read-more"]);
                break;
            default:
                break;
        }

        theField.setValue(randomLink);
    }

    link_subfield_handler(data) {
        const theFields = acf.getFields({key: data.key});
    
        theFields.forEach((field) => {
            if (field.val()) return;
            const linkData = this.data.link;        

            let randomLink = Helpers.getRandomFromArray(linkData.external);

            switch (data.name) {
                case 'external-link':
                    randomLink = Helpers.getRandomFromArray(linkData.external);
                    break;
                case 'internal-link':
                    randomLink = Helpers.getRandomFromArray(linkData.internal);
                    break;
                case 'read-more':
                    randomLink = Helpers.getRandomFromArray(linkData["read-more"]);
                    break;
                default:
                    break;
            }

            field.setValue(randomLink);
        });
    }

    radio_field_handler(data) {
        // Can't find out if it's already been filled and saved...
        // Grab the radio button
        let radioButton = acf.getField('field_628289149f16d');

        // Get the <ul> that contains the choices
        let choiceList = radioButton.$control();

        // Get the length of the array
        let choices = choiceList.children().length;

        // Grab a random index with the amount of choices as the max 
        const randomInt = Helpers.getRandomInt(choices);

        // Pick one of the list items
        let choice = choiceList.children()[randomInt];

        // Give the list item the selected class and check it
        choice.firstChild.classList.add('selected');
        choice.firstChild.firstChild.checked = true;
    }

    radio_subfield_handler(data) {
        const theFields = acf.getFields({key: data.key});
    
        theFields.forEach((field) => {
            // Get the <ul> that contains the choices
            let choiceList = field.$control();

            // Get the length of the array
            let choices = choiceList.children().length;

            // Grab a random index with the amount of choices as the max 
            const randomInt = Helpers.getRandomInt(choices);

            // Pick one of the list items
            let choice = choiceList.children()[randomInt];

            // Give the list item the selected class and check it
            choice.firstChild.classList.add('selected');
            choice.firstChild.firstChild.checked = true;
        });
    }

    relationship_field_handler(data) {
        console.log("Found a relationship field!");
        const field = acf.getField(data.key);
        const posts = data;
        console.log(field);

        field.on('ready', (e) => {
            console.log(e);
        });
    }

    repeater_field_handler(data) {
        acf.addAction('new_field', (field) => {
            this.handle_subfield(field.data, field.data.type);
        });

        let maxRows = data.max;   
 
        if ( maxRows === 0 ) {
            maxRows = 3;
        }

        for (let i = 0; i < 3; i++) {
            document.querySelector(`[data-key="${data.key}"] .acf-actions a[data-event="add-row"]`).click();
        }
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
                break;
            case 'testimonial':
                randomText = Helpers.getRandomFromArray(textData.testimonials);
                break;
            case 'quote':
                randomText = Helpers.getRandomFromArray(textData.quotes);
                break;
            case 'address':
                randomText = Helpers.getRandomFromArray(textData.addresses);
                break;
            case 'zipcode':
                randomText = Helpers.getRandomFromArray(textData.zipcodes);
                break;
            case 'city':
                randomText = Helpers.getRandomFromArray(textData.cities);
                break;
            default:
                break;
        }

        theField.setValue(randomText);
    }

    text_subhandler(data) {
        const theFields = acf.getFields({key: data.key});

        theFields.forEach((field) => {
            const name = data.name;
            const textData = this.data.text;        

            let randomText = Helpers.getRandomFromArray(textData.random);

            switch (name) {
                case 'name':
                    randomText = Helpers.getRandomFromArray(textData.names);
                    break;
                case 'testimonial':
                    randomText = Helpers.getRandomFromArray(textData.testimonials);
                    break;
                case 'quote':
                    randomText = Helpers.getRandomFromArray(textData.quotes);
                    break;
                case 'address':
                    randomText = Helpers.getRandomFromArray(textData.addresses);
                    break;
                case 'zipcode':
                    randomText = Helpers.getRandomFromArray(textData.zipcodes);
                    break;
                case 'city':
                    randomText = Helpers.getRandomFromArray(textData.cities);
                    break;
                default:
                    break;
            }

            field.setValue(randomText);
        });
    }

    textarea_field_handler(data) {
        const theField = acf.getField(data.key);

        if (theField.val()) return;

        const textareaData = this.data.textarea;        

        let randomText = Helpers.getRandomFromArray(textareaData.random);
        
        switch (data.name) {
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

    textarea_subfield_handler(data) {
        const theFields = acf.getFields({key: data.key});

        theFields.forEach((field) => {
            if (field.val()) return;

            const textareaData = this.data.textarea;        

            let randomText = Helpers.getRandomFromArray(textareaData.random);
            
            switch (data.name) {
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

            field.setValue(randomText);
        });
    }
}

const handler = new fieldHandler();

acf.addAction('ready_field', (field) => {
    handler.handle_field(field.data, field.data.type);
});

acf.addAction('wysiwyg_tinymce_init', function( ed, id, mceInit, field ){
    const wysiwygData = handler.data.wysiwyg[0]; 
    const tinyID = field.$el.find("textarea").attr("id");
    const tinyInstance = tinyMCE.editors[tinyID];
    tinyInstance.setContent(wysiwygData);
});