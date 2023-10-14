const path = require('path');
const Inventory = require('../model/itemModel');


exports.getForm = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../' , 'inventory.html'));
};

exports.getItems = (req, res, next) => {
    Inventory.findAll()
    .then((items) => {
        res.status(200).json(items);
    })
    .catch(err => console.log(err));
};

exports.postItem = (req, res, next) => {
    console.log('in the post');
    const itemName = req.body.itemName;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;

    //console.log(itemName, description, price, quantity);
    Inventory.create({
        itemName,
        description,
        price,
        quantity
    })
    .then((item) => {
        //res.status(201)
        res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.updateItemQuantity = (req, res, next) => {
    const itemId = req.params.itemId; // Extract the item ID from the URL
    const newQuantity = req.body.quantity; // Get the new quantity from the request body

    Inventory.findByPk(itemId) // Find the item by its ID
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }

            // Update the quantity of the item
            item.quantity = newQuantity;

            // Save the changes to the database
            return item.save();
        })
        .then(() => {
            res.status(200).json({ message: 'Item quantity updated successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error updating item quantity' });
        });
};


