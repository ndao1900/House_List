const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Container = require('../models/container.model.js').schema;
const Item = require('../models/item.model.js').schema;
const {nameAsKeyValidator} = require('../utils/utils.js');

const UserSchema = mongoose.Schema({
    name:{type: String,require:true,unique:true},
    containers:{type: Map, of: Container, default: {}, validate: nameAsKeyValidator},
    itemHistory:{type: Map, of: Item, default: {}, validate: nameAsKeyValidator}
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);