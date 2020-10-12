module.exports = (app) => {
    const containerItems = require('../controllers/container-item.controller.js');

    app.put('/containerItems/:containerItemId', containerItems.update);

}