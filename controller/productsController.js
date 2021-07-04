const express = require('express');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("product/AddorEditProduct", {
        viewTitle: "New Product"
    })
})

router.post("/", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var product = new Product();
    product.proID = req.body.proID;
    product.proName = req.body.proName;
    product.Amount = req.body.Amount;
    product.Price = req.body.Price;

    product.save((err, doc) => {
        if (!err) {
            res.redirect('product/Catalog');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("product/AddorEditProduct", {
                    viewTitle: "New Product",
                    product: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Product.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('product/Catalog');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("product/AddorEditProduct", {
                    viewTitle: 'Update Product',
                    product: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/Catalog', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.render("product/Catalog", {
                Catalog: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("product/AddorEditProduct", {
                viewTitle: "Update Product",
                product: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('product/Catalog');
        }
        else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'ID':
                body['IDError'] = err.errors[field].message;
                break;
            case 'Amount':
                body['Amount'] = err.errors[field].message;
                break;
            case 'Price':
                body['IDError'] = err.errors[field].message;
            default:
                break;
        }
    }
}

module.exports = router;