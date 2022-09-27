const Inventory = require("../models/inventory.model.js");

// Create and Save a new Inventory
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an Inventory
  const inventory = new Inventory({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    id: req.body.id
  });

  // Save Inventory in the database
  Inventory.create(inventory, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Inventory."
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Inventory.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};

// Find a single Inventory by Id
exports.findOne = (req, res) => {
  Inventory.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Inventory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Inventory with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Inventory identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Inventory.updateById(
    req.params.id,
    new Inventory(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Product not found with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating inventory with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Inventory with the specified id in the request
exports.delete = (req, res) => {
  Inventory.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product not found with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id " + req.params.id
        });
      }
    } else res.send({ message: `Product was deleted from inventory successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Inventory.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    else res.send({ message: `All products were deleted from inventory successfully!` });
  });
};
