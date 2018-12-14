import React from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import { UserLogin } from "../actions/loginActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {
        username: "",
        password: ""
      },
      status: "",
      message: "",
      userdata: {},
      isRequest: false
    };
    this.onSignIn = this.onSignIn.bind(this);
    this.textChanged = this.textChanged.bind(this);
  }
  textChanged(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      formdata: tmp,
      status: "",
      message: ""
    });
  }

  onSignIn() {
    this.setState({
      isRequest: true
    });
    this.props.UserLogin(this.state.formdata);
    this.setState({
      isRequest: false
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.auth.status,
      message: newProps.auth.message,
      userdata: newProps.auth.user
    });
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        this.onSignIn();
    }
};

  render() {
    return (
    <div onKeyPress={this._handleKeyPress} >  
      <div className="text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>

          <label for="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            required=""
            autofocus=""
            value={this.state.formdata.username}
            onChange={this.textChanged}
          />

          <label for="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            required=""
            value={this.state.formdata.password}
            onChange={this.textChanged}
          />
          {this.state.status === 404 ? (
            <Alert color="danger">{this.state.message} </Alert>
          ) : (
            ""
          )}
          <button
            className="btn btn-lg btn-primary btn-block"
            disabled={this.state.isRequest}
            type="button"
            onClick={this.onSignIn}
          >
            Sign in
          </button>
          <Link className="nav-Link" to="/forgot">
            Forgot Password>
          </Link>
          <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
        </form>
      </div>
    </div>
    );
  }
}

Login.propTypes = {
  UserLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.login
});

export default connect(
  mapStateToProps,
  { UserLogin }
)(Login);
