const User = require('../models/user.model.js');
const Item = require('../models/item.model.js');
const ItemController = require('../controllers/item.controller');

exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }

    const user = new User({
        name: req.body.name, 
        containers: req.body.containers || []
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

exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .populate({path: 'containers', populate: {path: 'items', populate:{path:'item'}}})
    .populate('itemHistory')
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
            message: "Error retrieving user with id " + req.params.userId
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
    let itemToAdd = req.params.itemId;
    let userId = req.params.userId;
    Item.findById(itemToAdd).then( (item) => {
        if(item){
            return addItemIdToHistory(userId, itemToAdd, res);
        }
        else{
            return res.status(404).send({message: "Unknown item"});
        }
    }).catch( err => { 
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    })
};

exports.addItemHistoryNewItem = (req, res) => {
    ItemController.create(req, res)
        .then(item => {
            addItemIdToHistory(req.params.userId, item._id, res);
        })
        .catch(err => res.status(500).send({message: "Can't create item: " + JSON.stringify(req.body)}))
}

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

addItemIdToHistory = (userId, itemId, res, isReturningResponse = true) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(
            userId, 
            {$addToSet: {"itemHistory": itemId}},
            {new: true})
        .then(user => {
            if(!user) {
                if(isReturningResponse)
                    res.status(500).send({message: "Could not add item to storage"});
                resolve(user);
            }
            res.send(user);
        }).catch(err => {
            console.error(err);
            if(isReturningResponse)
                res.status(500).send({message: "Could not add item to storage"});  
            reject(err);              
        });
    })
};