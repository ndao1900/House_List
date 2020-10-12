const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name:{type: String,require:true,unique:true},
    lifetime:{type: Number}
}, {
    timestamps: true
});
module.exports = mongoose.model('Item', ItemSchema);