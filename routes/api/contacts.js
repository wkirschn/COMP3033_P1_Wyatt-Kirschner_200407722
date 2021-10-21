// Router that handles the requests to /api/projects

const express = require('express');
const router = express.Router();

// Import the model

const Contact = require('../../models/contact');

// Implementing the GET method for all contacts
// How:             Fetch new contacts
// Endpoint:        /contacts
// Paramaters:      None
// Method:          GET
// Description:     List all contacts in the database
// Status Codes:    200: Success; 500: Error

router.get('/',(req, res, next) => {

    Contact.find((err, contacts) => {
        if (err) {
            console.log(err);
            res.json('Error!').status(500);
        }
        else {
            res.json(contacts).status(200);
        }
    })


});

// Implementing the GET method for contacts based on last name
// How:             Fetch contacts with matching last name
// Endpoint:        /contacts
// Paramaters:      JSON object containing information about a contact
// Method:          GET
// Description:     List all contacts in the database that have lastName
// Status Codes:    200: Success; 500: Error

router.get('/',(req, res, next) => {

 
    if (!req.body.lastName) {
        res.json({'ValidationError' : 'Last Name is a required field!'}).status(400);
    }

    else {
        Contact.findOne(
        { lastName: req.body.lastName }, // filter query
        {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
            phoneNumber: req.body.phoneNumber,
            addressLineOne: req.body.addressLineOne,
            addressLineTwo: req.body.addressLineTwo,
            province: req.body.province,
            postcode: req.body.postcode,
            country: req.body.country
        })
            
    }
});



// Implementing the POST method
// How:             Create new contact
// Endpoint:        /contacts
// Paramaters:      JSON object containing information about a contact
// Method:          POST
// Description:     Adds a new contact in the database
// Status Codes:    200: Success; 500: Error

router.post('/', (req, res, next) => {

    // Create a new contact
    // Contact info to be added to the DB

    if (!req.body.firstName) {
        res.json({'ValidationError' : 'First Name is a required field!'}).status(400);
    }
    else if (!req.body.lastName) {
        res.json({'ValidationError' : 'Last Name is a required field!'}).status(400);
    }

    else if (!req.body.emailAddress) {
        res.json({'ValidationError': 'Email Address is a required field!'}).status(400);
    }

else {

    Contact.create({

        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        addressLineOne: req.body.addressLineOne,
        addressLineTwo: req.body.addressLineTwo,
        province: req.body.province,
        postcode: req.body.postcode,
        country: req.body.country


    }, (err, newContact) => {

        if (err) {
            console.log(err);
            res.json({'ErrorMessage':'Server threw exception'}).status(500);
        }
        else {
            res.json(newContact).statusCode(200);
        }
    })
        // Callback function to handle creating a new project
}

});


// Implementing the PUT method
// How:             Update a contact
// Endpoint:        /projects/:_id
// Paramaters:      _id: id value of the contact to update, 
// JSON object containing updated information about a contact
// 
// Method:          PUT
// Description:     Updates a contact in the database
// Status Codes:    200: Success; 500: Error

router.put('/:_id', (req, res, next) => {
    // Validate required fields
    if (!req.body.firstName) {
        res.json({'ValidationError' : 'First Name is a required field!'}).status(400);
    }
    else if (!req.body.lastName) {
        res.json({'ValidationError' : 'Last Name is a required field!'}).status(400);
    }

    else if (!req.body.emailAddress) {
        res.json({'ValidationError': 'Email Address is a required field!'}).status(400);
    }

    else {
        Contact.findOneAndUpdate(
            { _id: req.params._id }, // filter query
            {
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress,
                phoneNumber: req.body.phoneNumber,
                addressLineOne: req.body.addressLineOne,
                addressLineTwo: req.body.addressLineTwo,
                province: req.body.province,
                postcode: req.body.postcode,
                country: req.body.country
                
            }, // Update the Contact
            (err, updatedContact) => {
                if (err) {
                    console.log(err);
                    res.json({ 'ErrorMessage': 'Server threw an exception' }).status(500);
                }
                else {
                    console.log(updatedContact);
                    res.json(updatedContact).status(200);
                }
            } // Callback to ensure it worked
        );
    }
});

// Implementing the DELETE method
// How:             Delete a contact
// Endpoint:        /projects/:_id
// Paramaters:      _id: id value of the contact to be deleted
// Method:          PUT
// Description:     Updates a contact in the database
// Status Codes:    200: Success; 500: Error


router.delete('/:_id', (req, res, next) => {
    Contact.remove(
        {
            _id: req.params._id
        },
        (err) => {
            if (err) {
                console.log(err);
                res.json({'ErrorMessage': 'Server threw exception'}).status(500);
            }
            else {
                res.json({'success':'true'}).status(200);
            }
        }

);
});

// Export the router so it can be configured in app.js

module.exports = router;
