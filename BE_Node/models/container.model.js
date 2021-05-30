const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('../models/item.model.js').schema;
const {nameAsKeyValidator} = require('../utils/utils.js');


const ContainerSchema = mongoose.Schema({
    name:{type: String},
    items:{type: Map, of: Item, default:{}, validate: nameAsKeyValidator},
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