import React, { Component } from "react";
import InventoryDataService from "../services/inventory.service";
import { withRouter } from '../common/with-router';

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.getInventory = this.getInventory.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      currentInventory: {
        name: "",
        description: "",
        price: "",
        id: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getInventory(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentInventory: {
          ...prevState.currentInventory,
          name: name
        }
      };
    });
  }

  onChangeQuantity(e) {
    const quantity = e.target.value;
    
    this.setState(prevState => ({
      currentInventory: {
        ...prevState.currentInventory,
        quantity: quantity
      }
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState(function(prevState) {
      return {
        currentInventory: {
          ...prevState.currentInventory,
          price: price
        }
      };
    });
  }

  onChangeId(e) {
    const id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentInventory: {
          ...prevState.currentInventory,
          id: id
        }
      };
    });
  }

  getInventory(id) {
    InventoryDataService.get(id)
      .then(response => {
        this.setState({
          currentInventory: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      name: this.state.currentInventory.name,
      quantity: this.state.currentInventory.quantity,
      price: this.state.currentInventory.price,
      id: this.state.currentInventory.id
    };

    InventoryDataService.update(this.state.currentInventory.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentInventory: {
            ...prevState.currentInventory
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateInventory() {
    InventoryDataService.update(
      this.state.currentInventory.id,
      this.state.currentInventory
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The inventory was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduct() {    
    InventoryDataService.delete(this.state.currentInventory.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/products');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentInventory } = this.state;

    return (
      <div>
        {currentInventory ? (
          <div className="edit-form">
            <h4>Inventory</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentInventory.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  value={currentInventory.quantity}
                  onChange={this.onChangeQuantity}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={currentInventory.price}
                  onChange={this.onChangePrice}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id">Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  value={currentInventory.id}
                  onChange={this.onChangeId}
                />
              </div>
              </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduct}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateInventory}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a product...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Inventory);
