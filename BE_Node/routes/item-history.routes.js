module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    
    app.post('/users/:userId/items', users.addItemHistory);

    app.delete('/users/:userId/items/:itemId', users.removeItemHistory);
}