const User = require('../models/user.model.js');
const Item = require('../models/item.model.js');
const ItemController = require('../controllers/item.controller');
const { runInTransaction } = require('mongoose-transact-utils');
const { exception } = require('console');


exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }

    const user = new User({
        name: req.body.name, 
        containers: req.body.containers
    });

    user.save()
        .then(data=>{res.send(data)})
        .catch(err=>{ res.status(500).send({message: err.message || "Error when adding user"})})
};

exports.findAll = (req, res) => {
    User.find()
        .populate({path: 'containers', populate: {path: 'items', populate:{path:'item'}}})
        .populate('itemHistory')
        .then(users=>{res.send(users)})
        .catch(err=>{ res.status(500).send({message: err.message || "Error when getting all users"})})
};

exports.findOne = (req, res, shouldSendResponse) => {
    return new Promise((resolve, reject) => {
        User.findById(req.params.userId)
            .then(user => {
                if(!user) {
                    const errMessage = "User not found with id " + req.params.userId;
                    console.error(errMessage);
                    res.status(404).send({message: errMessage});
                    reject(new exception(errMessage));
                } else {
                    if(shouldSendResponse){
                        res.send(user);
                    } else { resolve(user) }
                } })
            .catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });                
                }
                return res.status(500).send({
                    message: "Error retrieving user with id " + req.params.userId
                });
            });
    });
};

exports.update = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name, 
        containers: req.body.containers || [] 
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

exports.delete = ( req, res) => {
    let idsToRemove = req.body.idsToRemove;
    User.deleteMany({_id:idsToRemove}, (err)=>{
        if(err){
            console.error(err);
            return res.status(500).send({
                message: "Could not delete user(s) with id " + idsToRemove.toString()
            });
        }else{
            return res.send({message:"Delete successful"})
        }  
    })
};

exports.addItemHistory = ( req, res) => {
    let itemToAdd = req.body;
    let userId = req.query.userId;

    runInTransaction(session => {
        let errHandler = ((err,message) =>{
            session.abortTransaction()
            console.error(err);
            res.status(500).send({message: message});
        })

        Item.findOne(itemToAdd)
        .then( (item) => {
            if(item){
                addItemIdToHistory(userId, item._id, res)
                    .then(()=>{res.send(item)})
                    .catch(e => errHandler(e, "Can't add item history"));
            }
            else{
                ItemController.create(req, res, false)
                .then(item => {
                    addItemIdToHistory(userId, item._id, res)
                        .then(()=>{res.send(item)})
                        .catch(e => errHandler(e, "Can't add item history"));
                })
                .catch(e => errHandler(e, `Can't create item: ${JSON.stringify(req.body)}`));
            }
        }).catch( err => { 
            return res.status(500).send({
                message: "Error adding item itemId" + req.params.userId
            });
        })
    })
};

exports.removeItemHistory = ( req, res) => {
    let itemToRemove = req.params.itemId;
    if(itemToRemove){
        User.findOneAndUpdate(
            {_id: req.params.userId}, 
            {$pop: {"itemHistory": itemToRemove}},
            {new: true})
        .then(user => {
            if(!user) {
                return res.status(500).send({message: "Could not remove item from storage"});
            }
            res.send(user);
        }).catch(err => {
            console.error(err);
            return res.status(500).send({message: "Could not remove item form storage"});                
        });
    }else{
        User.findOneAndUpdate(
            {_id: req.params.userId}, 
            {"itemHistory": []},
            {new: true})
        .then(user => {
            if(!user) {
                return res.status(500).send({message: "Could not remove item from storage"});
            }
            res.send(user);
        }).catch(err => {
            console.error(err);
            return res.status(500).send({message: "Could not remove item from storage"});                
        });
    }
};

addItemIdToHistory = (userId, itemId) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(
            userId, 
            {$addToSet: {"itemHistory": itemId}},
            {new: true})
        .then(user => {
            if(!user) {
                reject("User not found")
            }else{
                resolve(user);
            }
        }).catch(err => {
            console.error(err);
            reject(err);              
        });
    })
};