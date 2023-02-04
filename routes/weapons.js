const express = require('express');
const router = express.Router();

const WeaponsController = require('../controllers/weapons');

router.get('/', WeaponsController.getAll);

router.get('/:id', WeaponsController.getSingle);

router.post('/', WeaponsController.createWeapon);

router.put('/:id', WeaponsController.updateWeapon);

router.delete('/:id', WeaponsController.deleteWeapon);

module.exports = router;