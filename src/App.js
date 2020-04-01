import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./Redux/store";
import axios from "axios";
//MUI stuff
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
//Components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";

//Redux
import { logoutUser, getUserData } from "./Redux/actions/userAction";
import { SET_AUTHENTICATED } from "./Redux/types";

axios.defaults.baseURL = "https://us-central1-social-23.cloudfunctions.net/api";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#333333",
      dark: "#000000",
      main: "#000",
      contrastText: "#fff"
    },
    secondary: {
      light: "#f7ac4e",
      dark: "#ab6a17",
      main: "#f59822",
      contrastText: "#000"
    }
  },
  form: {
    textAlign: "center"
  },
  image: {
    maxWidth: 200
  },
  pageTitle: {
    margin: "10px 0"
  },
  textField: {
    margin: "10px 0"
  },
  button: {
    margin: "20px 0",
    padding: "10px 15px"
  },
  progress: {
    position: "absolute",
    zIndex: "2",
    left: "50%",
    top: "50%"
  }
});

const idToken = localStorage.getItem("FBIdToken");
if (idToken) {
  const decodedToken = jwtDecode(idToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = idToken;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/user/:handle" component={user} />
                <Route
                  exact
                  path="/user/:handle/post/:postId"
                  component={user}
                />
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
