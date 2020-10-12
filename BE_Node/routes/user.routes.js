module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    app.post('/users', users.create);

    app.get('/users', users.findAll);

    app.get('/users/:userId', users.findOne);

    app.put('/users/:userId', users.update);

    app.post('/RemoveUsers', users.delete);
    
    app.post('/users/addItemHistory/', users.addItemHistory);

    app.put('/users/:userId/removeItemHistory/:itemId', users.removeItemHistory);

    app.put('/users/:userId/removeItemHistory', users.removeItemHistory);

}