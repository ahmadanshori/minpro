import React from "react";
import { Alert } from "reactstrap";
import { ForgotPassword } from "../actions/loginActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {
        username: "",
        password: "",
        repassword: "",
        updated_by: ""
      },
      alertData: {
        status: false,
        message: ""
      },
      status: "",
      message: ""
    };
    this.Submit = this.Submit.bind(this);
    this.textChanged = this.textChanged.bind(this);
  }
  textChanged(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    tmp["updated_by"] = tmp["username"];
    this.setState({
      formdata: tmp,
      status: "",
      message: "",
      alertData: {
        status: false
      }
    });
  }
  validatePassword(password) {
    let regex = new RegExp(/((?=.*[a-z])(?=.*[A-Z]))/);
    return regex.test(String(password));
    /*At least one lC,Up,Number,[@#$%],6-20 /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/*/
  }

  Submit() {
    if (
      this.state.formdata.username === "" ||
      this.state.formdata.password === "" ||
      this.state.formdata.repassword === ""
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "All forms must be filled!"
        }
      });
    } else if (this.validatePassword(this.state.formdata.password) === false) {
      this.setState({
        alertData: {
          status: true,
          message: "Password at least one character lowercase, uppercase"
        }
      });
    } else if (
      this.state.formdata.password !== this.state.formdata.repassword
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "Re-Password Not Match"
        }
      });
    } else {
      this.props.ForgotPassword(this.state.formdata);
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.auth.status,
      message: newProps.auth.message
    });
  }

  render() {
    return (
      <div className="text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Forgot Password</h1>
          <label for="inputEmail" className="sr-only">
            Username
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
          <label for="inputPassword" className="sr-only">
            Re-Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-Password"
            name="repassword"
            required=""
            value={this.state.formdata.repassword}
            onChange={this.textChanged}
          />
          {this.state.status === 404 ? (
            <Alert color="danger">{this.state.message} </Alert>
          ) : (
            ""
          )}
          {this.state.alertData.status === true ? (
            <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
            ""
          )}
          <button
            className="btn btn-lg btn-primary btn-block"
            disabled={this.state.isRequest}
            type="button"
            onClick={this.Submit}
          >
            Change Password
          </button>
          <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
        </form>
      </div>
    );
  }
}

Forgot.propTypes = {
  ForgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.login
});

export default connect(
  mapStateToProps,
  { ForgotPassword }
)(Forgot);
