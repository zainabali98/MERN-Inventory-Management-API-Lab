const router = require("express").Router();
const Product = require('../models/Product');


router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})


router.get('/', async (req, res) => {
    try {
        const allProducts = await Product.find()
        res.status(200).json(allProducts)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


router.get('/low-stock', async (req, res) => {
    try {
        const lowStockproduct = await Product.find({ quantity: { $lt: 3 } })
        res.status(200).json(lowStockproduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


router.get('/statistics', async (req, res) => {
    try {
        const statisticsOfAllProducts = await Product.find()

        const totalProducts = statisticsOfAllProducts.length

        const totalValue = statisticsOfAllProducts.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        )

        const lowStockItems = statisticsOfAllProducts.filter(
            (product) => product.quantity < 3
        ).length

        res.status(200).json({
            totalProducts: totalProducts,
            totalValue: totalValue,
            lowStockItems: lowStockItems
        })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const oneProduct = await Product.findById(req.params.id)
        res.status(200).json(oneProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
})


router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})







module.exports = router;