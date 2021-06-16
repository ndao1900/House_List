module.exports = (app) => {
    const containerItems = require('../controllers/container-item.controller.js');

    app.put('/users/:userId/containers/:containerName/items', containerItems.upsert);

    app.del('/users/:userId/containers/:containerName/items/:itemName', containerItems.delete);
}