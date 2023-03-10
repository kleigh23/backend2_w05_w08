const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('gaming').collection('weapons').find();
  result.toArray().then((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('gaming')
    .collection('weapons')
    .find({ _id: userId });
  result.toArray().then((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createWeapon = async (req, res) => {
  const weapon = {
    name: req.body.name,
    gunPerkOne: req.body.gunPerkOne,
    gunPerkTwo: req.body.gunPerkTwo,
    weaponPerkOne: req.body.weaponPerkOne,
    weaponPerkTwo: req.body.weaponPerkTwo,
    masterwork: req.body.masterwork,
    originTrait: req.body.originTrait,
    mod: req.body.mod
  };
  const result = await mongodb
  .getDb()
  .db('gaming')
  .collection('weapons')
  .insertOne(weapon);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the weapon.');
  }
}

const updateWeapon = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }
  const userId = new ObjectId(req.params.id);
  const weapon = {
    name: req.body.name,
    gunPerkOne: req.body.gunPerkOne,
    gunPerkTwo: req.body.gunPerkTwo,
    weaponPerkOne: req.body.weaponPerkOne,
    weaponPerkTwo: req.body.weaponPerkTwo,
    masterwork: req.body.masterwork,
    originTrait: req.body.originTrait,
    mod: req.body.mod
  };
  const result = await mongodb
  .getDb()
  .db('gaming')
  .collection('weapons')
  .replaceOne({ _id: userId }, weapon);
  console.log(result);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the weapon.');
  }
}

const deleteWeapon = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db('gaming')
  .collection('weapons')
  .deleteOne({ _id: userId }, true);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the weapon.');
  }
};

module.exports = { getAll, getSingle, createWeapon, updateWeapon, deleteWeapon};