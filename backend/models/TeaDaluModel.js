const mongoose = require('mongoose');

// Schema definition
const teaDaluSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    collectedDate: {
        type: String,
        required: true
    },
    totalKg: {
        type: Number,
        required: true
    },
    minusKg: {
        type: Number,
        required: true
    },
    subTotalKg: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('teaDalus', teaDaluSchema);
