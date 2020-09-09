const mongoose = require('mongoose');

const ContainerItemSchema = mongoose.Schema({
    item:{type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    container:{type: mongoose.Schema.Types.ObjectId, ref: 'Container'},
    quantity:{type: Number}
}, {
    timestamps: true
});
module.exports = mongoose.model('ContainerItem', ContainerItemSchema);