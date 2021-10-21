// First, need to import Mongoose

const mongoose = require('mongoose');

// We need a schema of what can be inputted and what is required


const schemaDefinition = {

    firstName: {
        type: String,
        required: true
    },
    
    middleName: {
        type: String,
        
    },

    lastName: {
        type: String,
        required: true
    },

    emailAddress: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        // For a Phone Number, it could technically be an INT / BIGINT
        // For a test project, validation isn't going to be used
    },

    addressLineOne: {
        type: String
    },

    addressLineTwo: {
        type: String
    },

    province: {
        type: String
    },

    postcode: {
        type: String
    },

    country: {
        type: String
    }
};

// Schema is used as a definition

let schemaObject = new mongoose.Schema(schemaDefinition);

// Export it

module.exports = mongoose.model('Contact', schemaObject);