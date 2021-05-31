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
                newUser = await user.save()
            })

            return res.send(newUser);
        });
}

const getNewContainerItem = (body) => new ContainerItem(body);