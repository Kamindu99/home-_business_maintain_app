const express = require('express');
const router = express.Router();
const TeaMoney = require('../models/TeaMoneyModel')

router.post("/", async (req, res) => {
    const teaMoney = new TeaMoney(req.body);
    try {
        const savedTeaMoney = await teaMoney.save();
        res.json(savedTeaMoney);
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

        // Fetch total number of matching teaMoneys
        const total = await TeaMoney.countDocuments(searchQuery);

        // Fetch paginated and sorted teaMoneys
        const teaMoneys = await TeaMoney.find(searchQuery)
            .sort(sortObj)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        const results = await Promise.all(teaMoneys.map(async (teaMoney) => {
            return {
                ...teaMoney.toObject()
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
    let teaMoneyId = req.params.id;
    const { code,depositedDate,totalKg,amount ,month,imageUrl} = req.body;
    const updatedTeaMoney = {
        code,
        depositedDate,
        totalKg,
        amount,
        month,
        imageUrl
    };

    const update = await TeaMoney.findByIdAndUpdate(teaMoneyId, updatedTeaMoney).then((response) => {
        res.status(200).send({ status: "Updated", response });

    }).catch((err) => {
        res.status(500).send({ status: "error in update", err });

    })
})

router.route("/:id").delete(async (req, res) => {
    let teaMoneyId = req.params.id;
    await TeaMoney.findByIdAndDelete(teaMoneyId).then(() => {
        res.status(200).send({ status: "deleted" });

    }).catch((err) => {
        res.status(500).send({ status: "error in delete", err });

    })
})

router.route("/:id").get(async (req, res) => {

    try {
        // Fetch paginated and sorted teaMoneys

        let teaMoneyId = req.params.id;
        const teaMoney = await TeaMoney.findById(teaMoneyId)

        const response = {
            ...teaMoney.toObject()
        };

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;