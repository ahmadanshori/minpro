import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Col
} from "reactstrap";

import { RePassword } from "../../../actions/loginActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Repass extends React.Component {
  constructor(props) {
    super(props);
    //let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      formdata: {
        username: this.props.username,
        password: "",
        newPassword: "",
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

  Submit = () => {
    alert(JSON.stringify(this.state.formdata));
    if (
      this.state.formdata.password === "" ||
      this.state.formdata.newPassword === "" ||
      this.state.formdata.repassword === ""
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "All forms must be filled!"
        }
      });
    } else if (
      this.validatePassword(this.state.formdata.newPassword) === false
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "Password at least one character lowercase, uppercase"
        }
      });
    } else if (
      this.state.formdata.newPassword !== this.state.formdata.repassword
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "Re-Password Not Match"
        }
      });
    } else {
      this.props.RePassword(this.state.formdata);
    }
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.auth.status,
      message: newProps.auth.message
    });
  }

  render() {
    return (
      <Modal isOpen={this.props.show} className={this.props.className}>
        <ModalHeader>Change Password</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="password" sm={3}>
                Password
              </Label>
              <Col sm={9}>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="curent password"
                  value={this.state.formdata.password}
                  onChange={this.textChanged}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="newPassword" sm={3}>
                New Password
              </Label>
              <Col sm={9}>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="new password"
                  value={this.state.formdata.newPassword}
                  onChange={this.textChanged}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="repassword" sm={3}>
                Re Password
              </Label>
              <Col sm={9}>
                <Input
                  type="password"
                  name="repassword"
                  id="rePassword"
                  placeholder="Re-password"
                  value={this.state.formdata.repassword}
                  onChange={this.textChanged}
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {this.state.alertData.status === true ? (
            <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
            ""
          )}
          {this.state.status === 404 ? (
            <Alert color="danger">{this.state.message} </Alert>
          ) : (
            ""
          )}
          <Button variant="contained" color="primary" onClick={this.Submit}>
            Submit
          </Button>
          <Button variant="contained" onClick={this.props.closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

Repass.propTypes = {
  RePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.login
});

export default connect(
  mapStateToProps,
  { RePassword }
)(Repass);
