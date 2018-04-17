const mongoose = require('mongoose');
const Person = mongoose.model('Person');
const Contact = mongoose.model('Contact');

exports.list_all_person = function(req, res) {
    Person.find({}, function(err, persons) {
        if (err) res.send(err);
        res.json(persons);
    });
};

exports.create_a_person = function(req, res) {
    let new_person = new Person(req.body);
    new_person.save(function(err, person) {
        if (err) res.send(err);
        res.json(person);
    });
};

exports.get_a_person = function(req, res) {
    Person.findById(req.params.personId, function(err, person) {
        if (err) res.send(err);
        res.json(person);
    });
};

exports.update_a_person = function(req, res) {
    Person.findOneAndUpdate({_id: req.params.personId}, req.body, {new: true}, function(err, person) {
        if (err) res.send(err);
        res.json(person);
    });
};

function delete_contact (id, res) {
    Contact.remove({_id: id}, function(err) {
        if (err) res.send(err);                
    });
}

exports.delete_a_person = function(req, res) {
    Contact.find({owner: req.params.personId}, function(err, contacts) {
        if (err) res.send(err);
        contacts.map(c => delete_contact(c._id, res));
    });
    Person.remove({_id: req.params.personId}, function(err, person) {
        if (err) res.send(err);
        res.json(person);
    });
};