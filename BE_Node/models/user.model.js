const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    name:{type: String,require:true,unique:true},
    containers:[{type: Schema.Types.ObjectId, ref: 'Container'}],
    itemHistory:[{type: Schema.Types.ObjectId, ref: 'Item'}]
}, {
    timestamps: true
});
module.exports = mongoose.model('User', UserSchema);