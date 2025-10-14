const mongoose = require('mongoose');

// Schema definition
const coconutHarvestSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    harvestDate: {
        type: String,
        required: true
    },
    totalCoconuts: {
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

module.exports = mongoose.model('coconutHarvests', coconutHarvestSchema);
