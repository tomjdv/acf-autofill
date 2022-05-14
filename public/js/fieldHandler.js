class fieldHandler {
    constructor() {
        this.data = data;
    }

    handle_field(data, type) {
        switch (type) {
            case 'text':
                this.text_field_handler(data);
                break;
            case 'image':
                this.image_field_handler(data);
                break;
            case 'repeater':
                this.repeater_field_handler(data);
                break;
            case 'radio':
                this.radio_field_handler(data);
                break;
            case 'checkbox':
                this.checkbox_field_handler(data);
                break;
            case 'textarea':
                this.textarea_field_handler(data);
                break;
            case 'wysiwyg':
                this.wysiwyg_field_handler(data);
                break;
            case 'select':
                this.select_field_handler(data);
                break;
            case 'true_false':
                this.true_false_field_handler(data);
                break;
            case 'number':
                this.number_field_handler(data);
                break;
            default:
                console.log("Unknown field type");
                break;
        }
    }

    text_field_handler(data) {
        // Get element and if it's already filled, return without overwriting
        const element = document.getElementById(`acf-${data.key}`);
        if (element.value !== '') return;

        // Grab the name of the field
        const name = data.name;
        const textFieldData = this.data.textField;

        let randomText = Helpers.getRandomFromArray(textFieldData.random);

        // Autofill the text field depending on the field's name
        switch (name) {
            case 'name':
                randomText = Helpers.getRandomFromArray(textFieldData.names);
            case 'testimonial':
                randomText = Helpers.getRandomFromArray(textFieldData.testimonials);
            case 'quote':
                randomText = Helpers.getRandomFromArray(textFieldData.quotes);
            case 'address':
                randomText = Helpers.getRandomFromArray(textFieldData.addresses);
            case 'zipcode':
                randomText = Helpers.getRandomFromArray(textFieldData.zipcodes);
            case 'city':
                randomText = Helpers.getRandomFromArray(textFieldData.cities);
            default:
                break;
        }
        
        element.value = randomText;
    }

    image_field_handler(data) {
        console.log("Found an image field!");
    }

    repeater_field_handler(data) {
        console.log("Found a repeater field!");
    }

    radio_field_handler(data) {
        console.log("Found a radio field!");
    }

    checkbox_field_handler(data) {
        console.log("Found a checkbox field!");
    }

    textarea_field_handler(data) {
        console.log("Found a textarea field!");
    }

    wysiwyg_field_handler(data) {
        console.log("Found a wysiwyg field!");
    }

    select_field_handler(data) {
        console.log("Found a select field!");
    }

    true_false_field_handler(data) {
        console.log("Found a true false field!");
    }

    number_field_handler(data) {
        console.log("Found a number field!");
    }
}

const handler = new fieldHandler();

acf.addAction('ready_field', (field) => {
    const data = field.data;
    const type = data.type;

    handler.handle_field(data, type);
});