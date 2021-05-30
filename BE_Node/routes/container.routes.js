module.exports = (app) => {
    const containers = require('../controllers/container.controller.js');

    app.post('/users/:userId/containers', containers.create);

    app.get('/users/:userId/containers', containers.findAll);

    app.get('/users/:userId/containers/:containerName', containers.findOne);

    app.put('/users/:userId/containers/:containerName', containers.update);

    app.delete('/users/:userId/containers/:containerId', containers.checkContainerOwnership, containers.delete);

}