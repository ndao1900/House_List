const Container = require('../models/container.model.js');

exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Container name can not be empty"
        });
    }

    const container = new Container({
        name: req.body.name, 
        items: Object.assign({},req.body.items),
        availableItems: Object.assign({},req.body.availableItems)        
    });

    container.save()
            .then(data=>{res.send(data)})
            .catch(err=>{ res.status(500).send({message: err.message || "Error when adding container"})})
};

exports.findAll = (req, res) => {
    Container.find()
            .then(containers=>{res.send(containers)})
            .catch(err=>{ res.status(500).send({message: err.message || "Error when getting all containers"})})
};

exports.findOne = (req, res) => {
    Container.findById(req.params.containerId)
    .then(container => {
        if(!container) {
            return res.status(404).send({
                message: "Container not found with id " + req.params.containerId
            });            
        }
        res.send(container);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Container not found with id " + req.params.containerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving container with id " + req.params.containerId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Container name can not be empty"
        });
    }

    // Find container and update it with the request body
    Container.findByIdAndUpdate(req.params.containerId, {
        name: req.body.name, 
        items: Object.assign({},req.body.items),
        availableItems: Object.assign({},req.body.availableItems) 
    }, {new: true})
    .then(container => {
        if(!container) {
            return res.status(404).send({
                message: "Container not found with id " + req.params.containerId
            });
        }
        res.send(container);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Container not found with id " + req.params.containerId
            });                
        }
        return res.status(500).send({
            message: "Error updating container with id " + req.params.containerId
        });
    });
};

exports.delete = (req, res) => {
    Container.findByIdAndRemove(req.params.containerId)
    .then(container => {
        if(!container) {
            return res.status(404).send({
                message: "Container not found with id " + req.params.containerId
            });
        }
        res.send({message: "Container deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Container not found with id " + req.params.containerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete container with id " + req.params.containerId
        });
    });
};