const Container = require('../models/container.model.js');
const { runInTransaction } = require('mongoose-transact-utils');
const User = require('../models/user.model');
const ContainerItemController = require('./container-item.controller');

exports.checkContainerOwnership = (req,res,next) => {
    if(!!req.query.userId && !!req.params.containerId){
        User.findOne(
            {
                _id: req.query.userId,
                containers: req.params.containerId
            }
        )
        .then(user => {
            if(!!user)
                next()
            else{
                res.status(500).send({message: `Container doesn't belong to user`})
            }
        })
        .catch(e => { res.status(500).send({message: e}) })
    }
    else{
        res.status(400).send();
    }
}

exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Container name can not be empty"
        });
    }

    const container = new Container(req.body);

    const userId = req.query.userId;
    if(userId){
        runInTransaction(session => {
            container.save()
                .then(container => {
                    User.update({_id: userId},{$push: {containers: container._id}})
                        .then(() => { res.send(container) })
                        .catch(() => session.abortTransaction())
                })
                .catch(err=>{ 
                    res.status(500).send({message: err.message || "Error when adding container"});
                    session.abortTransaction()
                })
        })
    }
};

exports.findAll = (req, res) => {
    Container.find()
        .then( containers => res.send(containers))
        .catch(err=>{ res.status(500).send({message: err.message || "Error when getting all containers"})})
};

exports.findOne = (req, res) => {
    Container.findById(req.params.containerId)
    .populate({path: 'containerItems', populate:{path:'item'}})
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
        layout: req.body.layout
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

exports.addItem = (req, res) => {
    const containerId = req.params.containerId;
    req.body.container = containerId;
    runInTransaction(session => {
        ContainerItemController.create(req,res,false)
            .then(containerItem => {
                if(containerItem._id){
                    Container.findByIdAndUpdate(
                        containerId,
                        {$addToSet: {containerItems: containerItem._id}}
                    ).then( data => res.send(containerItem) )
                    .catch( e => {
                        console.error(e);
                        res.status(500).send({message: `error adding containerItems`})            
                    })
                }
            })
            .catch(err =>{
                session.abortTransaction()
                console.error(err);
                res.status(500).send({message: "error adding ContainerItem"});
            })
    })
}