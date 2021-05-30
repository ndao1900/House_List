const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name:{type: String, require:true, unique:true},
    lifetime:{type: Number, default: 14}
}, {
    timestamps: true
});
module.exports = {
    model: mongoose.model('Item', ItemSchema),
    schema: ItemSchema
};