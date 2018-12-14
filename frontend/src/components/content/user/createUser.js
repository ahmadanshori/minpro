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
  Alert
} from "reactstrap";
import Select from "react-select";
import PropTypes from "prop-types";
import apiconfig from "../../../config/api.config.json";

import { connect } from "react-redux";
import { createUser } from "../../../actions/userActions";
import { getAllRoles } from "../../../actions/roleActions";
import { getUserEmployee } from "../../../actions/userActions";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      formdata: {
        username: "",
        password: "",
        repassword: "",
        m_role_id: "",
        m_employee_id: "",
        created_by: userdata.username
      },
      status: "",
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      alertData: {
        status: false,
        message: ""
      },
      formdata: tmp
    });
  }

  select1 = selectedOption => {
    let tmp = this.state.formdata;
    tmp["m_role_id"] = selectedOption.value;
    this.setState({
      formdata: tmp
    });
  };
  select2 = selectedOption => {
    let tmp = this.state.formdata;
    tmp["m_employee_id"] = selectedOption.value;
    this.setState({
      formdata: tmp
    });
  };

  // validateUsername(username) {
  //   let hitung = 0;
  //   let search = username;
  //   let patt = new RegExp(search);
  //   this.props.allUser.map(ele => {
  //     if (patt.test(ele.username)) {
  //       return (hitung += 1);
  //     }
  //   });
  //   if (hitung != 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  validateFilter(username) {
    let allUser = this.props.allUser.map(ele => ele.username);
    // alert(JSON.stringify(allUser));
    let a = allUser.filter(e => e === username);
    if (a.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  validatePassword(password) {
    let regex = new RegExp(/((?=.*[a-z])(?=.*[A-Z]))/);
    return regex.test(String(password));
    /*At least one lC,Up,Number,[@#$%],6-20 /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/*/
  }
  validateUsername(username) {
    let regex = new RegExp(/((?=.*\d).{8,10})/);
    return regex.test(String(username));
    /*At least one lC,Up,Number,[@#$%],6-20*/
  }

  submitHandler() {
    if (
      this.state.formdata.username === "" ||
      this.state.formdata.password === "" ||
      this.state.formdata.repassword === "" ||
      this.state.formdata.m_role_id === "" ||
      this.state.formdata.m_employee_id === ""
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "All forms must be filled!"
        }
      });
    } else if (this.validateFilter(this.state.formdata.username) === true) {
      this.setState({
        alertData: {
          status: true,
          message: "Ouh,your username has been used"
        }
      });
    } else if (this.validateUsername(this.state.formdata.username) === false) {
      this.setState({
        alertData: {
          status: true,
          message: "Username at least one character, number, 8+"
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
      this.props.createUser(this.state.formdata);
      this.props.closeHandler();
    }
  }

  componentWillReceiveProps(newStatus) {
    this.setState({
      status: newStatus.bujang.statusADD
    });
  }

  componentDidMount() {
    this.props.getAllRoles();
    this.props.getUserEmployee();
  }

  render() {
    const select1 = this.props.role.rolan.map((row, x) => {
      return {
        value: row.code,
        label: row.name
      };
    });
    const select2 = this.props.bujang.useremployee.map((row, x) => {
      return {
        value: row.employee_number,
        label: row.name
      };
    });

    this.state.status === 200
      ? this.props.modalStatus(1, "Created!", this.state.formdata.username)
      : console.log(this.state.status);
    return (
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader> Add User</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="insert username"
                value={this.state.formdata.username}
                onChange={this.changeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="insert password"
                value={this.state.formdata.password}
                onChange={this.changeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="repassword">Re-Password</Label>
              <Input
                type="password"
                name="repassword"
                id="repassword"
                placeholder="insert repassword"
                value={this.state.formdata.repassword}
                onChange={this.changeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="selectrole">Select Role</Label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                label="Select Role"
                name="m_role_id"
                options={select1}
                value={this.state.m_role_id}
                onChange={this.select1}
              />
            </FormGroup>
            <FormGroup>
              <Label for="selectrole">Select Employee ID</Label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                label="Select Employee"
                name="m_employee_id"
                options={select2}
                value={this.state.m_employee_id}
                onChange={this.select2}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {this.state.alertData.status === true ? (
            <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitHandler}
          >
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

CreateUser.propTypes = {
  createUser: PropTypes.func.isRequired,
  getAllRoles: PropTypes.func.isRequired,
  getUserEmployee: PropTypes.func.isRequired,
  bujang: PropTypes.object.isRequired,
  role: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bujang: state.useray,
  role: state.rolay
});

export default connect(
  mapStateToProps,
  { createUser, getAllRoles, getUserEmployee }
)(CreateUser);
