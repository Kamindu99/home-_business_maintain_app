const express = require('express');
const router = express.Router();
const CoconutHarvest = require('../models/CoconutHarvestModel')
const SingleCoconutHarvest = require('../models/SingleCoconutHarvest')

router.post("/", async (req, res) => {
    const coconutHarvest = new CoconutHarvest(req.body);
    try {
        const savedCoconutHarvest = await coconutHarvest.save();
        res.json(savedCoconutHarvest);
    } catch (err) {
        res.json({ message: err });
    }
})

router.post("/single-add", async (req, res) => {
    const singleCoconutHarvest = new SingleCoconutHarvest(req.body);
    try {
        const savedSingleCoconutHarvest = await singleCoconutHarvest.save();
        res.json(savedSingleCoconutHarvest);
    } catch (err) {
        res.json({ message: err });
    }
})

router.route("/").get(async (req, res) => {
    try {
        // Extract query parameters
        const { page = 0, per_page = 10, search = '', sort = '_id', direction = 'asc' } = req.query;

        // Convert page and per_page to integers
        const pageNumber = parseInt(page);
        const pageSize = parseInt(per_page);

        // Define sort object
        const sortOrder = direction === 'desc' ? -1 : 1; // descending (-1) or ascending (1)
        const sortObj = {};
        sortObj[sort] = sortOrder;

        // Build search query
        let searchQuery = {};

        // If a search term is provided, search by code
        if (search) {
            searchQuery.code = new RegExp(search, 'i'); // Case-insensitive search
        }

        // Fetch total number of matching coconutHarvests
        const total = await CoconutHarvest.countDocuments(searchQuery);

        // Fetch paginated and sorted coconutHarvests
        const coconutHarvests = await CoconutHarvest.find(searchQuery)
            .sort(sortObj)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        const results = await Promise.all(coconutHarvests.map(async (coconutHarvest) => {
            return {
                ...coconutHarvest.toObject()
            };
        }));

        // Calculate total pages
        const totalPages = Math.ceil(total / pageSize);

        // Build the response
        const response = {
            pagination: {
                page: pageNumber,
                size: pageSize,
                total: total,
                totalPages: totalPages
            },
            result: results
        };

        res.json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.route("/by-date").get(async (req, res) => {
    try {
        // Extract query parameters
        const { page = 0, per_page = 10, search = '', sort = '_id', direction = 'asc', date = '' } = req.query;

        // Convert page and per_page to integers
        const pageNumber = parseInt(page);
        const pageSize = parseInt(per_page);

        // Define sort object
        const sortOrder = direction === 'desc' ? -1 : 1; // descending (-1) or ascending (1)
        const sortObj = {};
        sortObj[sort] = sortOrder;

        // Build search query
        let searchQuery = {};

        // If a search term is provided, search by code
        if (search) {
            searchQuery.code = new RegExp(search, 'i'); // Case-insensitive search
        }

         if (date) {
            searchQuery.createdDate?.toISOString().split('T')[0] = new RegExp(date, 'i'); // Case-insensitive search
        }

        // Fetch total number of matching coconutHarvests
        const total = await SingleCoconutHarvest.countDocuments(searchQuery);

        // Fetch paginated and sorted coconutHarvests
        const coconutHarvests = await SingleCoconutHarvest.find(searchQuery)
            .sort(sortObj)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        const results = await Promise.all(coconutHarvests.map(async (coconutHarvest) => {
            return {
                ...coconutHarvest.toObject()
            };
        }));

        // Calculate total pages
        const totalPages = Math.ceil(total / pageSize);

        // Build the response
        const response = {
            pagination: {
                page: pageNumber,
                size: pageSize,
                total: total,
                totalPages: totalPages
            },
            result: results
        };

        res.json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.route("/:id").put(async (req, res) => {
    let coconutHarvestId = req.params.id;
    const { code,harvestDate,totalCoconuts} = req.body;
    const updatedCoconutHarvest = {
        code,
        harvestDate,
        totalCoconuts
    };

    const update = await CoconutHarvest.findByIdAndUpdate(coconutHarvestId, updatedCoconutHarvest).then((response) => {
        res.status(200).send({ status: "Updated", response });

    }).catch((err) => {
        res.status(500).send({ status: "error in update", err });

    })
})

router.route("/:id").delete(async (req, res) => {
    let coconutHarvestId = req.params.id;
    await CoconutHarvest.findByIdAndDelete(coconutHarvestId).then(() => {
        res.status(200).send({ status: "deleted" });

    }).catch((err) => {
        res.status(500).send({ status: "error in delete", err });

    })
})

router.route("/:id").get(async (req, res) => {

    try {
        // Fetch paginated and sorted coconutHarvests

        let coconutHarvestId = req.params.id;
        const coconutHarvest = await CoconutHarvest.findById(coconutHarvestId)

        const response = {
            ...coconutHarvest.toObject()
        };

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;