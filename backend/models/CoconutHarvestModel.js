const mongoose = require('mongoose');

// Schema definition
const CoconutHarvestSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    harvestDate: {
        type: String,
        required: true
    },
    noOfTrees: {
        type: Number,
        required: true
    },
    totalCoconuts: {
        type: Number,
        required: true
    },
    isPaidByCoconuts: {
        type: Boolean,
    },
    harvestFeeAmount: {
        type: Number,
    },
    harvestFeeCoconut: {
        type: Number,
    },
    listOfHarvest:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'singleCoconutHarvests'
    }],
    createdDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

// Auto-generate code before saving
CoconutHarvestSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastRecord = await mongoose.model('coconutHarvests')
            .findOne()
            .sort({ createdDate: -1 }) // get the latest
            .select('code');

        let newCode = '001';

        if (lastRecord && lastRecord.code) {
            // Convert to number and increment
            const lastNumber = parseInt(lastRecord.code, 10);
            const nextNumber = lastNumber + 1;
            newCode = String(nextNumber).padStart(3, '0');
        }

        this.code = newCode;
    }
    next();
});

module.exports = mongoose.model('coconutHarvests', CoconutHarvestSchema);
