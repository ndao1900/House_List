module.exports = (app) => {
    const containers = require('../controllers/container.controller.js');

    app.post('/containers', containers.create);

    app.get('/containers', containers.findAll);

    app.get('/containers/:containerId', containers.findOne);

    app.put('/containers/:containerId', containers.update);

    app.delete('/containers/:containerId', containers.delete);
}