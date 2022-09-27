import React, { Component } from "react";
import InventoryDataService from "../services/inventory.service";
import { Link } from "react-router-dom";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveProduct = this.retrieveProduct.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.removeAllProduct = this.removeAllProduct.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveProduct();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveProduct() {
    InventoryDataService.getAll()
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProduct();
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });
  }

  setActiveProduct(products, index) {
    this.setState({
      currentProduct: products,
      currentIndex: index
    });
  }

  removeAllProduct() {
    InventoryDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });

    InventoryDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, products, currentProduct, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search products"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Product List</h4>

          <ul className="list-group">
            {products &&
              products.map((products, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(products, index)}
                  key={index}
                >
                  {products.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProduct}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProduct ? (
            <div>
              <h4>Inventory</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentProduct.name}
              </div>
              <div>
                <label>
                <strong>Quantity:</strong>
                </label>{" "}
                {currentProduct.quantity}
              </div>
              <div>
              <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentProduct.price}
              </div>
              <div>
              <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentProduct.id}
              </div>


              <Link
                to={"/products/" + currentProduct.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a product...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
