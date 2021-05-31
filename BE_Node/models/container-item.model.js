const mongoose = require('mongoose');
const {validateDate} = require('../utils/utils.js');

const ContainerItemSchema = mongoose.Schema({
    name: {type: String, required: true},
    count: {type: Number, default: 1},
    timeAdded: {type: String, required: true, validate: [validateDate, 'date {VALUE} is not in the form of "mm/dd/yyyy"']}
}, {timestamps: true});
module.exports = {
    model: mongoose.model('ContainerItem', ContainerItemSchema),
    schema: ContainerItemSchema
}