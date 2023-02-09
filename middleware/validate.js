const validator = require('../helpers/validate.js');

const saveWeapon = (req, res, next) => {
  const validationRule = {

    name: 'required|string',
    gunPerkOne: 'required|string',
    gunPerkTwo: 'required|string',
    weaponPerkOne: 'required|string',
    weaponPerkTwo: 'required|string',
    masterwork: 'required|string',
    originTrait: 'string',
    mod: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveWeapon
};