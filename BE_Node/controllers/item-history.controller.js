const Item = require('../models/item.model.js').model;
const UserController = require('../controllers/user.controller.js');
const { runInTransaction } = require('mongoose-transact-utils');
const { areStringsEqual } = require('../utils/utils.js')
const {toKey} = require('../utils/utils.js');

exports.upsert = (req, res,) => {
    if(!req.body.name) {
        return res.status(400).send({ message: "Item name can not be empty"});}

    UserController.findOne(req, req, false)
        .then(async user => {
            user.itemHistory.set(toKey(req.body.name), new Item(req.body));
            const newUser = await user.save()
            return res.send(newUser);
        });
};

exports.findAll = (req, res) => {
    UserController.findOne(req, req, false)
        .then(user => {
            return res.send(Array.from(user.itemHistory.values()));
        });
};

const setNewItem = ({user, oldItem, newItem}) => {
    Object.keys(newItem).forEach(key => {oldItem.set(key, newItem[key])});
    newItem = oldItem;
    user.itemHistory.set(toKey(newItem.name), newItem);
}

const renameItem = ({user, newItem, oldItem}) => {
    const conflictingItem = user.itemHistory.get(newItem.name);
    if(!!conflictingItem){
        throw { status:400, message: `item "${newItem.name}" has already existed`};
    } else {
        user.itemHistory.set(toKey(oldItem.name), undefined);
        setNewItem({user, oldItem, newItem});
    }
}

exports.patch = (req, res) => {
    const {itemName} = req.params;
    const newItem = req.body;
    
    if(!itemName) {
        return res.status(400).send({ message: "Item name can not be empty" });
    }

    UserController.findOne(req, req, false)
        .then(async user => {
            const oldItem = user.itemHistory.get(toKey(itemName));
            if(!!oldItem){
                try{
                    await runInTransaction(async session => {
                        if(!!newItem.name && !areStringsEqual(newItem.name, itemName)){
                            renameItem({user, newItem, oldItem}); 
                        } else {
                            setNewItem({user, oldItem, newItem});
                        }
                        newUser = await user.save();
                        res.status(200).send(newUser);
                    })    
                } catch(e) {console.error(e); res.status(500).send()}
            } else {
               return res.status(400).send({message: `item "${itemName}" doesn't exist`})} });
};

exports.delete = ( req, res) => {
    let idsToRemove = req.body.idsToRemove;
    Item.deleteMany({_id:idsToRemove}, (err)=>{
        if(err){
            console.error(err);
            return res.status(500).send({
                message: "Could not delete item(s) with id " + idsToRemove.toString()
            });
        }else{
            res.send({message:"Delete successful"})
        }
        
    })
    // Item.findByIdAndRemove(req.params.itemId)
    // .then(item => {
    //     if(!item) {
    //         return res.status(404).send({
    //             message: "Item not found with id " + req.params.itemId
    //         });
    //     }
    //     res.send({message: "Item deleted successfully!"});
    // }).catch(err => {
    //     if(err.kind === 'ObjectId' || err.name === 'NotFound') {
    //         return res.status(404).send({
    //             message: "Item not found with id " + req.params.itemId
    //         });                
    //     }
    //     return res.status(500).send({
    //         message: "Could not delete item with id " + req.params.itemId
    //     });
    // });
};