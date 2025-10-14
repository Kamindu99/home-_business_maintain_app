const mongoose = require('mongoose');

const SingleCoconutHarvestSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    nameOfTree: {
        type: String
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
    }
});

// Auto-generate code before saving
SingleCoconutHarvestSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastRecord = await mongoose.model('singleCoconutHarvests')
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

module.exports = mongoose.model('singleCoconutHarvests', SingleCoconutHarvestSchema);
