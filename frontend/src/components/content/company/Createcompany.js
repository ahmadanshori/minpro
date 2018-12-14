import React from "react";
import ReactDOM from "react-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import Select from 'react-select'
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import apiconfig from "../../../config/api.config.json";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { createCompany } from "../../../actions/companyAction";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateCompany extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      code: "",
      name: "",
      email: "",
      address: "",
      phone: "",
      created_by: userdata.m_employee_id,
      alertData: {
        status: false,
        message: ""
      },
      status: "",
      labelWidth: 0,
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    // this.getListProvince();
    // this.getListCity();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.companyReducer.statusADD
    });
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
      alertData: {
        status: false,
        message: ""
      }
    });
  }

  validateFilter = (companyname) => {
    let allCompany = this.props.allCompany.map(ele => ele.name);
    // alert(JSON.stringify(allCompany));
    let a = allCompany.filter(e => e.toLowerCase() === companyname.toLowerCase());
    if (a.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    let regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regex.test(String(email).toLowerCase());
  }

  validatePhone(phone) {
    let regex = new RegExp(/^[0-9\-\+\,\(\)]{9,15}$/);
    return regex.test(phone);
  }

  submitHandler() {
    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.phone === "" ||
      this.state.address === "" ||
      this.state.provinsi === "" ||
      this.state.kota === ""
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "all forms must be filled!"
        }
      });
    } else if (this.validateFilter(this.state.name) === true) {
      this.setState({
        alertData: {
          status: true,
          message: "Company with name "+(this.state.name)+" is already exist"
        }
      });
    } else if (this.validateEmail(this.state.email) === false) {
      this.setState({
        alertData: {
          status: true,
          message: "invalid email format,type in the email section correctly!"
        }
      });
    } else if (this.validatePhone(this.state.phone) === false) {
      this.setState({
        alertData: {
          status: true,
          message:
            "invalid phone number format,type in the phone number section correctly!"
        }
      });
    } else {
      const formdata = {
        code: this.state.code,
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        phone: this.state.phone,
        created_by: this.state.created_by,
      }
      this.props.createCompany(formdata)
      this.props.closeHandler();
      //this.props.getlist();
    }
  }

  render() {
    this.state.status == 200
      ? this.props.modalStatus(1, "Created", this.state.name)
      : console.log("")
    const { classes } = this.props;

    return (
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader> Add Company</ModalHeader>
        <ModalBody>
          {/* <form className={classes.container}> */}
          <form>
            <TextField
              //   className={classes.textField}
              id="standard-read-only-input"
              name="code"
              label=""
              defaultValue="Code Company Auto Generated"
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              //   className={classes.textField}
              name="name"
              label="*Type Company Name"
              value={this.state.name}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              //   className={classes.textField}
              id="outlined-email-input"
              label="*Type Company Email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.changeHandler}
              autoComplete="email"
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              //   className={classes.textField}
              name="phone"
              label="*Type Company Phone Number"
              value={this.state.phone}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              //   className={classes.textField}
              name="address"
              label="*Type Company Address"
              value={this.state.address}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </form>
        </ModalBody>
        <ModalFooter>
          {this.state.alertData.status == true ? (
            <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
              ""
            )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitHandler}
          >
            Save
          </Button>
          <Button variant="contained" onClick={this.props.closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

CreateCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  createCompany: PropTypes.func.isRequired,
  companyReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  companyReducer: state.companyIndexReducer
});

export default connect(mapStateToProps,
  { createCompany })
  (CreateCompany);