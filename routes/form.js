const express = require('express');

const router = express.Router();

const itemController = require('../controllers/item');

router.get('/', itemController.getForm);

router.get('/inventory', itemController.getItems);

router.post('/inventory', itemController.postItem);

router.put('/inventory/:itemId', itemController.updateItemQuantity);

module.exports = router;