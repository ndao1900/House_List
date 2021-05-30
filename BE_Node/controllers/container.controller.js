const Container = require('../models/container.model.js').model;
const { runInTransaction } = require('mongoose-transact-utils');
const User = require('../models/user.model');
const UserController = require('./user.controller');
const {areStringsEqual, toKey, defaultIfNull} = require('../utils/utils.js');

const handleFailTransaction = ({err, res, message}) => {
    console.log(err);
    return res.status(defaultIfNull(err.status, 500)).send({message: message});
}

exports.checkContainerOwnership = (req,res,next) => {
    const userId = req.params.userId;
    const containerId = req.params.userId;  
    if(!!userId && !!containerId){
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
        return res.status(400).send({message: "Container name can not be empty"});
    }
    if(!req.params.userId) {
        return res.status(400).send({message: "UserId name can not be empty"});
    }

    const container = new Container(req.body);
    UserController.findOne(req, res, false)
        .then(user => {
            if(!!user.containers.get(toKey(container.name))){
                return res.status(400).send({message: `Container "${toKey(container.name)}" already existed`});
            } else{
                user.containers.set(toKey(container.name), container)
                user.save().then((user) => res.send(user));
        }})
};

exports.findAll = (req, res) => {
    UserController.findOne(req, res, false)
        .then(user => {
            const containers = user.get("containers")
            if(!!containers){
                return res.send(containers);
            } else {
                console.error("user's container is null!")
                return res.status("500").send()}})
};

exports.findOne = (req, res) => {
    const {containerName} = req.params;
    
    UserController.findOne(req, res, false)
        .then(user => {
            const container = user.containers.get(toKey(containerName))
                if(!!container){
                    return res.send(container);
                } else {
                    return res.status("404").send({message: `no container "${containerName}" found`})}})};

exports.update = (req, res) => {
    const {containerName} = req.params;
    let newContainer = req.body;
    if(!containerName){
       return res.status(400).send({message: "container must have name"});
    }

    UserController.findOne(req, res, false)
        .then(user => {
            const oldContainer = user.containers.get(toKey(containerName));
            if(!!oldContainer){
                runInTransaction(async session => {
                    try{
                        if(!!newContainer.name && !areStringsEqual(newContainer.name, containerName)){
                            renameContainer({user, newContainer, oldContainer}); 
                        } else {
                            setNewContainer({user, oldContainer, newContainer});
                        }
                        user = await user.save();
                        res.status(200).send(user);
                    } catch(err){
                        handleFailTransaction({err, session, res, message: !!err.status? err.message : "couldn't update container"})
                    }
                })
            } else {
               return res.status(400).send({message: `container "${containerName}" doesn't exist`}) }})};

const renameContainer = ({user, newContainer, oldContainer}) => {
    const conflictingContainer = user.containers.get(newContainer.name);
    if(!!conflictingContainer){
        throw { status:400, message: `container "${newContainer.name}" has already existed`};
    } else {
        user.containers.set(toKey(oldContainer.name), undefined);
        setNewContainer({user, oldContainer, newContainer});
    }
}

const setNewContainer = ({user, oldContainer, newContainer}) => {
    Object.keys(newContainer).forEach(key => {oldContainer.set(key, newContainer[key])});
    newContainer = oldContainer;
    user.containers.set(toKey(newContainer.name), oldContainer);
}

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