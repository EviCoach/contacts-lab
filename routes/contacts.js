
const router = require('express').Router();
const Contacts = require('../models/contact.model');

router.route('/').get((req, res) => {
    Contacts.find()
        .then(contacts => res.json(contacts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const { first_name, last_name, other_name, phone_numbers } = setContact(req);

    const contact = new Contacts({
        first_name, last_name, other_name, phone_numbers
    });

    contact.save()
        .then((contact) => res.json('Contact Saved: ' + contact))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Contacts.findById(req.params.id)
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json(err));
});

router.route('/update/:id').patch((req, res) => {
    // get values from req
    const { first_name, last_name, other_name, phone_numbers }
        = setContact(req);
    // get contact with this id
    Contacts.findById(req.params.id)
        .then(contact => {
            // if any req property is null, use the existing value
            contact.first_name = first_name === null ? contact.first_name : first_name;
            contact.first_name = last_name === null ? contact.last_name : last_name;
            contact.other_name = first_name === null ? other_name : other_name;
            contact.phone_numbers = phone_numbers === null ? contact.phone_numbers : phone_numbers;

            contact.save().then(() => {
                res.json('Contact updated')
            }).catch(err => {
                res.status(400).json('Error: ' + err);
            });
        })


})

module.exports = router;

function setContact(req) {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const other_name = req.body.other_name;
    const phone_numbers = req.body.phone_numbers;
    return { first_name, last_name, other_name, phone_numbers };
}
