const mongoose = require('mongoose');

const ContainerSchema = mongoose.Schema({
    name:{type: String,require:true,unique:true},
    items:{type: JSON},
    availableItems:{type: JSON}
}, {
    timestamps: true,
    minimize: false
});
module.exports = mongoose.model('Container', ContainerSchema);