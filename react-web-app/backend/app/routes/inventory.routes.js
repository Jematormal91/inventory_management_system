module.exports = app => {
  const products = require("../controllers/inventory.controller.js");

  var router = require("express").Router();

  // Create a new Inventory
  router.post("/", products.create);

  // Retrieve all Products
  router.get("/", products.findAll);

  // Retrieve a single Inventory with id
  router.get("/:id", products.findOne);

  // Update a Inventory with id
  router.put("/:id", products.update);

  // Delete a Inventory with id
  router.delete("/:id", products.delete);

  // Delete all Products
  router.delete("/", products.deleteAll);

  app.use('/api/products', router);
};
