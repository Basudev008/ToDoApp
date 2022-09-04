const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }, 
    dueDate: {
        type: Date,
        required: true
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;