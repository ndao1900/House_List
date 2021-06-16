const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContainerItem = require('../models/container-item.model.js').schema;
const {nameAsKeyValidator} = require('../utils/utils.js');
const {uniqueValidator} = require('../utils/validation-utils.js');

const validateContainerItems = (map) => { !!map && map.forEach((val, key) => uniqueValidator(val, "timeAdded")) };
const itemMapValidators = [{validator: nameAsKeyValidator}, {validator: validateContainerItems}];

const ContainerSchema = mongoose.Schema({
    name:{type: String},
    items:{type: Map, default:{}, validate: itemMapValidators},
    layout:{type: JSON, default:{
        tiles:[],
        size:[4,4]
    }}
}, {
    timestamps: true,
    minimize: false
});
module.exports = 
{
    model: mongoose.model('Container', ContainerSchema),
    schema: ContainerSchema
}


