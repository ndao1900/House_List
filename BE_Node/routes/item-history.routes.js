module.exports = (app) => {
    const itemHistory = require('../controllers/item-history.controller.js');
    
    app.get('/users/:userId/items', itemHistory.findAll);

    app.put('/users/:userId/items', itemHistory.upsert);

    app.patch('/users/:userId/items/:itemName', itemHistory.patch);
}