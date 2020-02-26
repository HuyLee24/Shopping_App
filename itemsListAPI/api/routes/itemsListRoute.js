//'use strict';
module.exports = function(app) {
var itemsList = require('../controllers/itemsListController');

// todoList Routes
app.route('/items')
    .get(itemsList.list_all_items)
    .post(itemsList.create_a_item);


app.route('/items/:itemId')
    .get(itemsList.read_a_item)
    .put(itemsList.update_a_item)
    .delete(itemsList.delete_a_item);
};