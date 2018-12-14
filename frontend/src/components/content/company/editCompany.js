import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import apiconfig from "../../../config/api.config.json";
import { connect } from 'react-redux'
import { editCompany } from '../../../actions/companyAction'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class EditCompany extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    super(props);
    this.state = {
      formdata: {
        code: "",
        name: "",
        address: "",
        email: "",
        phone: "",
        updated_by: userdata.m_employee_id
      },
      alertData: {
        status: false,
        message: ""
      },
      status: ""
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      lala:newProps.companytest,
      formdata: newProps.companytest,
      status: newProps.companyReducer.statusPUT
    });
  }

  changeHandler(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      formdata: tmp,
      alertData: {
        status: false,
        message: ""
      }
    });
  }

  validateFilter = (companyname) => {
    let allCompany = this.props.allCompany.map(ele => ele.name);
    alert(companyname.toLowerCase());
    alert(this.props.companytest.name.toLowerCase());
    let a = allCompany.filter(e => e.toLowerCase() === companyname.toLowerCase());
    if (companyname.toLowerCase() === this.props.companytest.name.toLowerCase() || a.length === 0) {
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
      this.state.formdata.name === "" ||
      this.state.formdata.email === "" ||
      this.state.formdata.phone === "" ||
      this.state.formdata.address === ""
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "all forms must be filled!"
        }
      });
    } else if (this.validateFilter(this.state.formdata.name) === true) {
      this.setState({
        alertData: {
          status: true,
          message: "Company name already exist"
        }
      });
    } else if (this.validateEmail(this.state.formdata.email) === false) {
      this.setState({
        alertData: {
          status: true,
          message: "invalid email format,type in the email section correctly!"
        }
      });
    } else if (this.validatePhone(this.state.formdata.phone) === false) {
      this.setState({
        alertData: {
          status: true,
          message:
            "invalid phone number format,type in the phone number section correctly!"
        }
      });
    } else {
      //alert(JSON.stringify(this.state.status))
      //alert(JSON.stringify(this.state.formdata))
      this.props.editCompany(this.state);
      // if(this.state.status == 200){
      //   this.props.modalStatus(1, "Updated", this.state.formdata.name)
      // } else {
      //   this.props.modalStatus(2, "Failed!")
      // }
      this.props.closeModalHandler();
      //this.props.getlist();
    }
  }

  render() {
    //alert(JSON.stringify(this.props.companytest))
    this.state.status == 200
      ? this.props.modalStatus(1, "Updated", this.state.formdata.name)
      : console.log("")
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.edit} className={this.props.className}>
        <ModalHeader> Edit Company</ModalHeader>
        <ModalBody>
          <form >
            <TextField
              name="code"
              label="Company Code"
              // className={classes.textField}
              value={this.state.formdata.code}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              name="name"
              label="Company Name"
              // className={classes.textField}
              value={this.state.formdata.name}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              // className={classes.textField}
              type="email"
              name="email"
              value={this.state.formdata.email}
              onChange={this.changeHandler}
              autoComplete="email"
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="phone"
              label="Phone Number"
              // className={classes.textField}
              value={this.state.formdata.phone}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="address"
              label="Address"
              defaultValue="Default Value"
              rows="4"
              value={this.state.formdata.address}
              onChange={this.changeHandler}
              // className={classes.textField}
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
          <Button variant="contained" onClick={this.props.closeModalHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

EditCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  editCompany: PropTypes.func.isRequired,
  companyReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  companyReducer: state.companyIndexReducer
});

export default connect(mapStateToProps,
  { editCompany })
  (EditCompany);
