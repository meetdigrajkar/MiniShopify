import React from "react";
import { Redirect } from "react-router";
import UserService from "../services/UserService";
import FormField from "./FormField";
import TopMenu from "./TopMenu";
import { connect } from "react-redux";
import { setAuthenticated } from "../redux/actions";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  TextField,
  Button,
  Link,
  Box,
  Checkbox,
  Tooltip,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { blue, grey, teal } from "@material-ui/core/colors";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { toast } from "bulma-toast";
import "../styling/styles.css";

const mapStateToProps = (state) => {
  return { isAuthenticated: state.isAuthenticated };
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const theme = createMuiTheme({
  spacing: [0, 4, 8, 16, 32, 64],
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      authenticateFailed: false,
      redirectToCreateAccount: false,
      showPassword: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     nextState.username !== this.state.username ||
  //     nextState.password !== this.state.password ||
  //     nextProps.isAuthenticated !== this.props.isAuthenticated ||
  //     nextState.authenticateFailed !== this.state.authenticateFailed ||
  //     nextState.redirectToCreateAccount !== this.state.redirectToCreateAccount ||
  //     nextState.toggle
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  async handleSubmit() {
    var obj = {
      username: this.state.username,
      password: this.state.password,
    };

    var authenticateResponse = await UserService.authenticateMerchant(obj);

    if (!authenticateResponse) {
      this.setState({ authenticateFailed: true });
    } else {
      toast({
        message: "Welcome back " + obj.username + "!",
        type: "is-primary",
        dismissible: true,
        pauseOnHover: true,
      });
    }

    this.props.setAuthenticated(authenticateResponse);
  }

  toggleVisibility() {
    const visibility = this.state.showPassword;
    this.setState({ showPassword: !visibility });
  }

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div style={{ backgroundColor: teal[50] }}>
        {this.state.redirectToCreateAccount && (
          <Redirect to={{ pathname: "/create-account" }} />
        )}

        {this.props.isAuthenticated && <Redirect to={{ pathname: "/" }} />}

        <Grid container component="main" style={{ height: "100vh" }}>
          <div className="LeftGridPhoto" />
          <div className="RightGrid">
            <div className="AuthPlacement">
              <p>
                Don't have an account?
                <a
                  className="AuthRedirectLink"
                  onClick={() =>
                    this.setState({ redirectToCreateAccount: true })
                  }
                >
                  Get started
                </a>
              </p>
            </div>

            <div className="SignInGrid">
              <div className="AuthDescriptionBox">
                <div className="AuthDescription">
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ paddingBottom: "10px", alignSelf: "start" }}
                  >
                    Sign in to MiniShopify
                  </Typography>

                  <Typography
                    component="h1"
                    variant="h8"
                    style={{ paddingBottom: "10px", alignSelf: "flex-start" }}
                  >
                    Enter your details below.
                  </Typography>
                </div>

                <div>
                  <Tooltip title="Firebase">
                    <img
                      className="FireboxImg"
                      src="/static/icons/firebase.png"
                      ariaLabel="Firebase"
                    />
                  </Tooltip>
                </div>
              </div>
              {/* <Alert severity="info" variant="filled">
                <p style={{ textAlign: "center" }}>
                  Use username : test / password : test
                </p>
              </Alert> */}
              <form
                style={{ width: "100%", marginTop: "1px" }}
                noValidate
                action={undefined}
              >
                <TextField
                  helperText={
                    this.state.authenticateFailed ? "Invalid Input." : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle htmlColor="rgb(0, 171, 85)" />
                      </InputAdornment>
                    ),
                  }}
                  value={this.state.username}
                  onChange={(event) =>
                    this.setState({ username: event.target.value })
                  }
                  error={this.state.authenticateFailed}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  required
                  autoFocus
                  style={{ borderRadius: "12px" }}
                />

                <TextField
                  helperText={
                    this.state.authenticateFailed ? "Invalid Input." : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={this.toggleVisibility}>
                          {this.state.showPassword ? (
                            <Visibility htmlColor="rgb(0, 171, 85)" />
                          ) : (
                            <VisibilityOff htmlColor="rgb(0, 171, 85)" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={this.state.password}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                  error={this.state.authenticateFailed}
                  color="primary"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type={this.state.showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  style={{ borderRadius: "20px" }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    padding: "10px",
                    margin: theme.spacing(3, 0, 2),
                    backgroundColor: "rgb(0, 171, 85)",
                    borderRadius: "12px",
                  }}
                  onClick={this.handleSubmit}
                >
                  Sign In
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, { setAuthenticated })(SignIn);
