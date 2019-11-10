const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name:{type: String,require:true,unique:true},
    price:{type: Number},
    unit:{type: String},
}, {
    timestamps: true
});
module.exports = mongoose.model('Item', ItemSchema);