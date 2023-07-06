const express = require('express');
const router = express.Router();
const controller = require('../controllers/position');


router.get('/:categoryid',controller.getByCategoryId)

router.post('/',controller.create)
router.patch('/',controller.update)
router.delete('/',controller.remove)

module.exports = router;