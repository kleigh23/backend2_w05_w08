const express = require('express');
const router = express.Router();

const WeaponsController = require('../controllers/weapons');
const validation = require('../middleware/validate');

router.get('/', WeaponsController.getAll);

router.get('/:id', WeaponsController.getSingle);

router.post('/', validation.saveWeapon, WeaponsController.createWeapon);

router.put('/:id', validation.saveWeapon, WeaponsController.updateWeapon);

router.delete('/:id', WeaponsController.deleteWeapon);

module.exports = router;