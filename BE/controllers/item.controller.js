const Item = require('../models/item.model.js');

exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Item name can not be empty"
        });
    }

    const item = new Item({
        name: req.body.name, 
        price: req.body.price || 0,
        unit: req.body.price || ""        
    });

    item.save()
            .then(data=>{res.send(data)})
            .catch(err=>{ res.status(500).send({message: err.message || "Error when adding item"})})
};

exports.findAll = (req, res) => {
    Item.find()
            .then(items=>{res.send(items)})
            .catch(err=>{ res.status(500).send({message: err.message || "Error when getting all items"})})
};

exports.findOne = (req, res) => {
    Item.findById(req.params.itemId)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });            
        }
        res.send(item);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving item with id " + req.params.itemId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Item name can not be empty"
        });
    }

    // Find item and update it with the request body
    Item.findByIdAndUpdate(req.params.itemId, {
        name: req.body.name, 
        price: req.body.price || 0,
        unit: req.body.price || ""
    }, {new: true})
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        res.send(item);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Error updating item with id " + req.params.itemId
        });
    });
};

exports.delete = (req, res) => {
    Item.findByIdAndRemove(req.params.itemId)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        res.send({message: "Item deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Could not delete item with id " + req.params.itemId
        });
    });
};