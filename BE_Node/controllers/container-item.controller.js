const ContainerItem = require('../models/container-item.model.js');

exports.create = (req, res, isReturningResponse = true) => {
    return new Promise((resolve, reject) => {
        const containerItem = new ContainerItem(req.body)
        containerItem.save()
            .then(containerItem => {
                resolve(containerItem);
                if(isReturningResponse){
                    res.send(containerItem);
                }
            })
            .catch(err => res.status(500).send({message: "error adding ContainerItem"}))
    })
};

exports.update = (req, res) => {
    ContainerItem.findByIdAndUpdate(
        req.params.containerItemId, 
        req.body,
        {new: true}
    ).then(containerItem => {
        if(!containerItem) {
            return res.status(404).send({
                message: "ContainerItem not found with id " + req.params.containerItemId
            });
        }
        res.send(containerItem);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ContainerItem not found with id " + req.params.containerItemId
            });                
        }
        return res.status(500).send({
            message: "Error updating containerItem with id " + req.params.containerItemId
        });
    });
};