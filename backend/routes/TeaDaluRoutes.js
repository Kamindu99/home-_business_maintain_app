const express = require('express');
const router = express.Router();
const Product = require('../models/TeaDaluModel')
const Category = require('../models/CategoryModel')

router.post("/", async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.json(savedProduct);
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

        // Build search query
        let searchQueryFavo = { isActive: true };

        // Fetch total number of matching products
        const total = await Product.countDocuments(searchQuery);

        // Fetch paginated and sorted products
        const products = await Product.find(searchQuery)
            .sort(sortObj)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        const results = await Promise.all(products.map(async (product) => {
            return {
                ...product.toObject()
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
    let productId = req.params.id;
    const { code,collectedDate,totalKg,subTotalKg } = req.body;
    const updatedProduct = {
        code,
        collectedDate,
        totalKg,
        subTotalKg
    };

    const update = await Product.findByIdAndUpdate(productId, updatedProduct).then((response) => {
        res.status(200).send({ status: "Updated", response });

    }).catch((err) => {
        res.status(500).send({ status: "error in update", err });

    })
})

router.route("/:id").delete(async (req, res) => {
    let productId = req.params.id;
    await Product.findByIdAndDelete(productId).then(() => {
        res.status(200).send({ status: "deleted" });

    }).catch((err) => {
        res.status(500).send({ status: "error in delete", err });

    })
})

router.route("/:id").get(async (req, res) => {

    try {

        // Build search query
        let searchQueryFavo = { isActive: true };

        // Fetch paginated and sorted products

        let productId = req.params.id;
        const product = await Product.findById(productId)

        const response = {
            ...product.toObject()
        };

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;