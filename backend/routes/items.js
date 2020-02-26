const express = require('express');

const fs = require('fs');
const path = require('path');

const router = express.Router();

//Get Items
const getItems = async (req, res, next) => {
    try {
      const data = fs.readFileSync(path.join(__dirname, './items.json'));
      const items = JSON.parse(data);
      const Items = items.find(item => item.id === Number(req.params.id));
      if (!Items) {
        const err = new Error('Items not found');
        err.status = 404;
        throw err;
      }
      res.json(Items);
    } catch (e) {
      next(e);
    }
  };

  router
    .route('/api/v1/items/:id')
    .get(getItems);  

//Create new Items
const createItems = async (req, res, next) => {
    try {
      const data = fs.readFileSync(itemsFilePath);
      const items = JSON.parse(data);
      const newItems = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        catelogy: req.body.catelogy,
        location: req.body.location,
        images: req.body.images,
        price: req.body.price,
        date_of_posting: req.body.date_of_posting,
        delivery: req.body.delivery,
        seller_name: req.body.seller_name,
        contact_info: req.body.contact_info,
      };
      items.push(newItems);
      fs.writeFileSync(itemsFilePath, JSON.stringify(items));
      res.status(201).json(newItems);
    } catch (e) {
      next(e);
    }
  };

  router
    .route('/api/v1/items')
    .post(createItems);

//Update Items
const updateItems = async (req, res, next) => {
    try {
      const data = fs.readFileSync(itemsFilePath);
      const items = JSON.parse(data);
      const Items = items.find(item => item.id === Number(req.params.id));
      if (!Items) {
        const err = new Error('Items not found');
        err.status = 404;
        throw err;
      }
      const newItemsData = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        catelogy: req.body.catelogy,
        location: req.body.location,
        images: req.body.images,
        price: req.body.price,
        date_of_posting: req.body.date_of_posting,
        delivery: req.body.delivery,
        seller_name: req.body.seller_name,
        contact_info: req.body.contact_info,
      };
      const newItems = items.map(item => {
        if (item.id === Number(req.params.id)) {
          return newItemsData;
        } else {
          return item;
        }
      });
      fs.writeFileSync(itemsFilePath, JSON.stringify(newItems));
      res.status(200).json(newItemsData);
    } catch (e) {
      next(e);
    }
  };

  router
  .route('/api/v1/items/:id')
  .get(getItems)
  .put(updateItems);

//Delete Items
const deleteItems = async (req, res, next) => {
  try {
    const data = fs.readFileSync(itemsFilePath);
    const items = JSON.parse(data);
    const Items = items.find(item => item.id === Number(req.params.id));
    if (!Items) {
      const err = new Error('Items not found');
      err.status = 404;
      throw err;
    }
    const newItems = items.map(item => {
      if (item.id === Number(req.params.id)) {
        return null;
      } else {
        return item;
      }
    })
    .filter(item => item !== null);
    fs.writeFileSync(itemFilePath, JSON.stringify(newItems));
    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

router
  .route('/api/v1/items/:id')
  .get(getItems)
  .put(updateItems)
  .delete(deleteItems);

module.exports = router;