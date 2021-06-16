const ContainerItem = require('../models/container-item.model.js').model;
const ContainerController = require('../controllers/container.controller.js');
const { validateDate, toKey } = require('../utils/utils.js');
const { runInTransaction } = require('mongoose-transact-utils');


exports.upsert = (req, res) => {
    const {name, timeAdded, count} = req.body;
    if(!validateDate(timeAdded)){
        return res.status(400).send({message: `date ${timeAdded} is not in the form of mm/dd/yyyy`})
    }

    ContainerController.findOne(req, res, false)
        .then(async ({user, container}) => {
            if(!user.itemHistory.get(toKey(name))){
                return res.status(400).send({message: `item name "${name}" is not in user's itemHistory`})
            }
            
            let newUser;

            await runInTransaction(async session => {
                const itemRecords = container.items.get(toKey(name));
                if(!itemRecords){
                    container.items.set(toKey(name), [getNewContainerItem(req.body)])
                } else {
                    const matchingRecordIndex = itemRecords.findIndex(record => record.timeAdded === timeAdded)
                    if(matchingRecordIndex === -1){
                        itemRecords.push(getNewContainerItem(req.body));
                    } else {
                        itemRecords[matchingRecordIndex] = getNewContainerItem(req.body);
                    }
                }
                user.markModified(container.$basePath)
                try{
                    return res.send(await user.save());
                } catch(e){
                    console.error(e);
                    res.status(500).send();
                }
            })
        });
}

exports.delete = (req, res) => {
    const {itemName} = req.params;

    ContainerController.findOne(req, res, false)
    .then(async ({user, container}) => {
        await runInTransaction(async session => {
            container.items.set(toKey(itemName), undefined);
            user.markModified(container.$basePath + `.items.${itemName}`);
            try{
                return res.send(await user.save());
            } catch(e){
                console.error(e);
                res.status(500).send();
            }
        })
    })
}

const getNewContainerItem = (body) => new ContainerItem(body);