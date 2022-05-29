const express =require('express');
const ItemsService = require('../services/itemService');

const router = express.Router();
const service = new ItemsService();

router.get('/', async (req, res, next) => {
    try {
      const { search } = req.query;
      const items = await service.find(search);
      res.json(items);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id',    
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const findItem = await service.findOne(id);
      res.json(findItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
