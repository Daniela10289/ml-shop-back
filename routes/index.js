const express = require('express');

const itemsRouter = require('./itemRouter');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/items', itemsRouter);
}

module.exports = routerApi;
