const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContainerSchema = mongoose.Schema({
    name:{type: String,require:true,unique:true},
    items:[{type: Schema.Types.ObjectId, ref:"ContainerItem"}],
    layout:{type: JSON, default:{
        tiles:[],
        size:[4,4]
    }}
}, {
    timestamps: true,
    minimize: false
});
module.exports = mongoose.model('Container', ContainerSchema);