import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartProduct";
import Summary from "./Summary";
import { connect } from "react-redux";
import { updateCart } from "../../redux/actions";
import ShopService from "../../services/ShopService";
import TopBar from "../topBar/TopBar";

const mapStateToProps = (state) => {
  return { cartProducts: state.cartProducts };
};

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      cartProducts: [],
    };

    this.setTotal = this.setTotal.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.setLocalCartCopy = this.setLocalCartCopy.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.checkoutProducts = this.checkoutProducts.bind(this);
    this.cart = this.cart.bind(this);
    this.displayFilledCart = this.displayFilledCart.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cartProducts.length !== prevProps.cartProducts.length) {
      this.calculateTotal(this.props.cartProducts);
      this.setLocalCartCopy(this.props.cartProducts);
    }
  }

  componentDidMount() {
    this.calculateTotal(this.props.cartProducts);
    this.setLocalCartCopy(this.props.cartProducts);
  }

  setLocalCartCopy(cartProduct) {
    this.setState({ cartProducts: cartProduct });
  }

  componentWillUnmount() {
    this.props.updateCart(this.state.cartProducts);
  }

  calculateTotal(cartProducts) {
    var total = 0;
    cartProducts.forEach((item) => {
      total += item.cost * item.selectedQuantity;
    });
    this.setState({ total: total });
  }

  removeProduct(product) {
    const currentCartList = this.state.cartProducts;
    const newCartList = currentCartList.filter(
      (cartProduct) => cartProduct.productID !== product.productID
    );
    this.setState({ cartProducts: newCartList });
    this.props.updateCart(newCartList);
    this.calculateTotal(newCartList);
  }

  updateQuantity(product, selectedQuantity, number) {
    const itemCost = product.cost;
    const total = this.state.total;
    this.setState({ total: total + itemCost * number });

    const currentCartList = this.state.cartProducts;
    currentCartList.forEach((item) => {
      if (item.productID === product.productID) {
        item.selectedQuantity = selectedQuantity;
        return;
      }
    });

    this.setState({ cartProducts: currentCartList });
  }

  setTotal(cost) {
    this.setState({ total: cost });
  }

  async checkoutProducts() {
    var checkoutProductsList = [];

    this.state.cartProducts.forEach((item) => {
      var obj = {
        productID: item.productID,
        quantity: item.selectedQuantity,
      };
      checkoutProductsList.push(obj);
    });

    const success = await ShopService.checkoutCartProducts(
      checkoutProductsList
    );
  }

  displayFilledCart() {
    return (
      <div style={{ height: "50vh" }}>
        <Grid
          container
          style={{
            backgroundColor: "#EEF1F1",
            height: "40px",
            width: "100%",
            borderRadius: "5px",
            alignItems: "center",
            paddingLeft: "10px",
            paddingRight: "10px",
            marginTop: "10px",
          }}
        >
          <Grid
            item
            xs={5}
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography style={{ fontSize: "12px" }}>Products</Typography>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography style={{ fontSize: "12px" }}>Price</Typography>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography style={{ fontSize: "12px" }}>Quantity</Typography>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography style={{ fontSize: "12px" }}>Total</Typography>
          </Grid>
        </Grid>

        <div style={{ overflowY: "auto", height: "48vh" }}>
          {this.state.cartProducts.map((cartProduct) => {
            return (
              <CartItem
                key={cartProduct.productID}
                cartProduct={cartProduct}
                removeProduct={this.removeProduct}
                total={this.state.total}
                setTotal={this.setTotal}
                updateQuantity={this.updateQuantity}
              />
            );
          })}
        </div>
      </div>
    );
  }

  cart() {
    return (
      <Grid>
        <Card
          variant="outlined"
          style={{
            width: "40vw",
            minHeight: "50vh",
            boxShadow:
              "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
            borderRadius: "16px",
          }}
        >
          <CardContent>
            <Typography
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
              variant="h6"
            >
              {`Cart (${this.state.cartProducts.length} Products)`}
            </Typography>
            {this.state.cartProducts.length === 0 ? (
              <EmptyCart />
            ) : (
              this.displayFilledCart()
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  }

  summary() {}

  render() {
    return (
      <div style={{ height: "100vh", overflow: "hidden" }}>
        <TopBar inCart={true} />
        <div style={{ height: "50vh", paddingTop: "5%" }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item>{this.cart()}</Grid>
            <Grid item>
              <Summary
                cartProducts={this.props.cartProducts}
                total={this.state.total}
                checkoutProducts={this.checkoutProducts}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { updateCart })(Checkout);
