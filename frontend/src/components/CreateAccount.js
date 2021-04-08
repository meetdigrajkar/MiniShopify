import React from "react";
import AuthService from "../services/AuthService";
import { Redirect } from "react-router";
import { toast } from "bulma-toast";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Tooltip,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import EmailIcon from "@material-ui/icons/Email";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { connect } from "react-redux";
import { setAuthenticated } from "../redux/actions";
import { PRIMARY_THEME_COLOR } from "../constants/constants";

const theme = createMuiTheme({
  spacing: [0, 4, 8, 16, 32, 64],
});

const mapStateToProps = (state) => {
  return { isAuthenticated: state.isAuthenticated };
};

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      redirectToSignIn: false,
      showPassword: false,
      registrationFailed: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    const visibility = this.state.showPassword;
    this.setState({ showPassword: !visibility });
  }

  async handleSubmit() {
    var user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    if (user.email !== "" && user.password !== "") {
      var [success, message] = await AuthService.createAccount(user);

      if (!success) {
        this.setState({ registrationFailed: true });
      }

      toast({
        message: message,
        type: success ? "is-primary" : "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.redirectToSignIn && (
          <Redirect to={{ pathname: "/sign-in" }} />
        )}

        {this.props.isAuthenticated && <Redirect to={{ pathname: "/" }} />}

        <Grid container component="main" style={{ height: "100vh" }}>
          <div className="LeftGridPhoto" />
          <div className="RightGrid">
            <div className="AuthPlacement">
              <p>
                Already have an account?
                <a
                  className="AuthRedirectLink"
                  onClick={() => this.setState({ redirectToSignIn: true })}
                >
                  Sign In
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
                    Create your account on MiniShopify
                  </Typography>

                  <Typography
                    component="h1"
                    variant="subtitle1"
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
                    />
                  </Tooltip>
                </div>
              </div>
              <form
                style={{ width: "100%", marginTop: "1px" }}
                action={undefined}
              >
                <Grid container style={{ flexGrow: 1 }}>
                  {/* <Grid sm={6} item style={{ paddingRight: "10px" }}> */}
                  <Grid sm={12} item>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AssignmentIndIcon
                              htmlColor={PRIMARY_THEME_COLOR}
                            />
                          </InputAdornment>
                        ),
                      }}
                      value={this.state.name}
                      onChange={(event) =>
                        this.setState({ name: event.target.value })
                      }
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="Name"
                      name="name"
                      required
                      autoFocus
                    />
                  </Grid>
                  {/* <Grid sm={6} item style={{ paddingLeft: "10px" }}>
                    <TextField
                      helperText={
                        this.state.registrationFailed
                          ? "Account Already Exists"
                          : ""
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
                      error={this.state.registrationFailed}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="Username"
                      name="username"
                      required
                      autoFocus
                    />
                  </Grid> */}
                </Grid>
                <TextField
                  helperText={
                    this.state.registrationFailed
                      ? "Account Already Exists"
                      : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon htmlColor={PRIMARY_THEME_COLOR} />
                      </InputAdornment>
                    ),
                  }}
                  value={this.state.email}
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                  error={this.state.registrationFailed}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  required
                  autoFocus
                />

                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={this.toggleVisibility}>
                          {this.state.showPassword ? (
                            <Visibility htmlColor={PRIMARY_THEME_COLOR} />
                          ) : (
                            <VisibilityOff htmlColor={PRIMARY_THEME_COLOR} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={this.state.password}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                  color="primary"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type={this.state.showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    padding: "10px",
                    margin: theme.spacing(3, 0, 2),
                    backgroundColor: PRIMARY_THEME_COLOR,
                    borderRadius: "12px",
                  }}
                  onClick={this.handleSubmit}
                >
                  Register
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, { setAuthenticated })(CreateAccount);
