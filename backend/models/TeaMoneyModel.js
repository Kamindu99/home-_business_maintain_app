const mongoose = require('mongoose');

// Schema definition
const teaMoneySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    depositedDate: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    totalKg: {
        type: Number,
        required: true
    },
    amount: {
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

module.exports = mongoose.model('teaMoneys', teaMoneySchema);
