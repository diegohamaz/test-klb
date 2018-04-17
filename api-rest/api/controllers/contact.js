const mongoose = require('mongoose');
const Person = mongoose.model('Person');
const Contact = mongoose.model('Contact');

exports.list_all_contacts = function(req, res) {
    Contact.find({}, function(err, contact) {
        if (err) res.send(err);
        res.json(contact);
    });
};

exports.create_a_contact = function(req, res) {
    Person.findById(req.body.owner, function(err, person) {
        if (err) res.send(err);
        if (person !== null) {
            let new_contact = new Contact(req.body);
            new_contact.save(function(err, contact) {
                if (err) res.send(err);
                res.json(contact);
            });
        }
        else 
            res.json({ message: 'Person id ' + req.body.owner + ' doesn\'t exist' });
    });
};

exports.get_a_contact = function(req, res) {
    Contact.findById(req.params.contactId, function(err, contact) {
        if (err) res.send(err);
        if (req.params.personId && contact !== null && contact.owner !== req.params.personId) {
            res.json({ message: 'person does not own this contact' });
        }
        else {
            res.json(contact);
        }
    });
};

exports.update_a_contact = function(req, res) {
    Contact.findById(req.params.contactId, function(err, contact) {
        if (err) res.send(err);
        if (contact !== null) {
            let id_to_find = req.body.owner;
            if (req.body.owner === undefined && req.params.personId) {
                id_to_find = req.params.personId;
            }
            Person.findById(id_to_find, function(err, person) {
                if (err) res.send(err);
                if (person !== null) {
                    Contact.findOneAndUpdate({_id: req.params.contactId}, req.body, {new: true}, function(err, contact) {
                        if (err) res.send(err);
                        res.json(contact);
                    });
                }
                else
                    res.json({ message: 'Person id ' + contact.owner + ' doesn\'t exist' });
            });
        }
        else 
            res.json({ message: 'Contact doesn\' exist'});
    });
};

function remove_contact_from_person_childs(id, id_child, res) {
    Person.findById(id, function(err, person) {
        if (err) res.send(err);
        if (person !== null) {
            const index = person.children.indexOf(id_child);
            if (index > -1) {
                person.children.splice(index, 1);
                person.save(function(err) {
                    if (err) res.send(err);
                });
            }
        }
    });
}

exports.delete_a_contact = function(req, res) {
    Contact.findById(req.params.contactId, function(err, contact) {
        if (err) res.send(err);
        if (req.params.personId && contact !== null && contact.owner !== req.params.personId) {
            res.json({ message: 'person does not own this contact' });
        }
        else if (contact !== null) {
            remove_contact_from_person_childs(req.body.owner, req.params.contactId);
            Contact.remove({_id: req.params.contactId}, function(err) {
                if (err) res.send(err);                
                res.json(contact);
            });
        }
        else 
            res.json({ message: 'Contact doesn\' exist'});
    });
};
