module.exports = function(app) {
    const personController = require('../controllers/person');
    const contactController = require('../controllers/contact');
    
    app.route('/person')
        .get(personController.list_all_person)
        .post(personController.create_a_person);

    app.route('/person/:personId')
        .get(personController.get_a_person)
        .put(personController.update_a_person)
        .delete(personController.delete_a_person);

    app.route('/contact')
        .get(contactController.list_all_contacts)
        .post(contactController.create_a_contact);

    app.route('/contact/:contactId')
        .get(contactController.get_a_contact)
        .put(contactController.update_a_contact)
        .delete(contactController.delete_a_contact);             
};