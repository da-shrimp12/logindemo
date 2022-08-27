import React from "react";
import Profile from "./Profile";
import "./login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLogin: localStorage.getItem("accessToken") != null,
    };
  }

  setParams = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", this.state.username);
    urlencoded.append("password", this.state.password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:8080/Demo/account-controller/account", requestOptions)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem("accessToken", result.accessToken);
        alert("Success");
        this.setState({ isLogin: true });
      })
      .catch((error) => {
        console.log(error);
        alert("Username or password is wrong");
      });

  };

  onLogoutSuccess = () => {
    this.setState({ isLogin: false });
  };

  render() {

    return (
      <div>
        {this.state.isLogin ? (
          <Profile key={this.state.isLogin} />
        ) : (
          <div className="login-page">
            <section className="h-100">
              <div className="container h-100">
                <div className="row justify-content-md-center h-100">
                  <div className="card-wrapper">
                    <div className="card fat">
                      <div className="card-body">
                        <h4 className="card-title">Login</h4>

                        <form className="my-login-validation">
                          <div className="form-group">
                            <label>User Name</label>
                            <input
                              id="username"
                              type="text"
                              className="form-control"
                              onChange={this.setParams}
                              name="userName"
                              required
                            />

                            <div className="invalid-feedback">
                              UserId is invalid
                            </div>
                          </div>

                          <div className="form-group">
                            <label>
                              Password
                              <a href="forgot.html" className="float-right">
                                Forgot Password?
                              </a>
                            </label>
                            <input
                              id="password"
                              type="password"
                              className="form-control"
                              onChange={this.setParams}
                              name="password"
                              required
                            />
                            <div className="invalid-feedback">
                              Password is required
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheck1"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>

                          <div className="form-group m-0">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={this.login}
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }
}
