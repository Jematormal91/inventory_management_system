const sql = require("./db.js");

// constructor
const Inventory = function(inventory) {
  this.name = inventory.name;
  this.quantity = inventory.quantity;
  this.price = inventory.price;
  this.id = inventory.id;
};

Inventory.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created inventory: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Inventory.findById = (id, result) => {
  sql.query(`SELECT * FROM products WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found inventory: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Inventory with the id
    result({ kind: "not_found" }, null);
  });
};

Inventory.getAll = (name, result) => {
  let query = "SELECT * FROM products";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Inventory.updateById = (id, inventory, result) => {
  sql.query(
    "UPDATE products SET name = ?, quantity = ?, price = ?, id = ? WHERE id = ?",
    [inventory.name, inventory.quantity, inventory.price, inventory.id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Inventory with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated inventory: ", { id: id, ...inventory });
      result(null, { id: id, ...inventory });
    }
  );
};

Inventory.remove = (id, result) => {
  sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Inventory with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted inventory with id: ", id);
    result(null, res);
  });
};

Inventory.removeAll = result => {
  sql.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Inventory;
