import React from "react";
import TopBar from "./topBar/TopBar";
import { connect } from "react-redux";
import DisplayShops from "./shop/DisplayShops";
import { Button } from "@material-ui/core";
import { setShops } from "../redux/actions";
import ShopService from "../services/ShopService";

const mapStateToProps = (state) => {
  return { isAuthenticated: state.isAuthenticated };
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onClick = this.onClick.bind(this);
    this.addTestShop = this.addTestShop.bind(this);
  }

  componentDidMount() {}

  async addTestShop() {
    var success = await ShopService.addTestShop();
    if (success) {
      await ShopService.getAllShops();
    }
  }

  onClick(shopName) {
    console.log("open shop " + shopName);
  }

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <TopBar />
        <DisplayShops />
      </div>
    );
  }
}

export default connect(mapStateToProps, { setShops })(Home);
