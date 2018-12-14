import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import apiconfig from "../../../config/api.config.json";
import { connect } from "react-redux";
import { createMenu } from "../../../actions/menuActions";

// const styles = theme => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing.unit * 2
//   }
// });

class CreateMenu extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      formdata: {
        code: "",
        name: "",
        controller: "",
        parent_id: false,
        created_by: userdata.username
      },
      status: "",
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0,
      show: false
    };

  }

  changeHandler = (e) => {
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

  // membuat pilihan parent atau child
  // radioChange = event => {
  //   let tmp = event.target.value;
  //   if (tmp == "child") {
  //     this.setState({ show: false });
  //   } else {
  //     this.setState({ show: true });
  //   }
  // };

  submitHandler = () => {
    if (
      this.state.formdata.name === "" ||
      this.state.formdata.controller === "" 
      // this.state.formdata.parent_id === ""
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "all forms must be filled!"
        }
      });
    } else {
      this.props.createMenu(this.state.formdata);
      this.props.closeHandler();
      this.props.getlist();
    }
  }

  componentWillReceiveProps(newStatus) {
    this.setState({
      status: newStatus.take.statusADD
    });
  }

  render() {
    // const { classes } = this.props;
    this.state.status == 200
      ? this.props.modalStatus(1, "Created!", this.state.formdata.code)
      : console.log(this.state.status);

    //alert(JSON.stringify(this.props.menu));
    const filter = this.props.menu.filter(row => row.parent_id === null);
    // alert(JSON.stringify(this.props.menu))
    //console.log(filter);
    return (
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader> Add Menu</ModalHeader>
        <ModalBody>
          <form>
            <div class="input-group mb-4 input-group-sm">
              <label for="code" class="col-md-3">
                Menu ID
              </label>
              <input
                type="text"
                class="form-control"
                name="code"
                value={this.state.formdata.code}
                disabled="true"
                onChange={this.changeHandler}
              />
            </div>

            <div class="input-group mb-4 input-group-sm">
              <label for="text" class="col-md-3">
                Menu Name
              </label>
              <input
                type="text"
                class="form-control"
                name="name"
                value={this.state.formdata.name}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div class="input-group mb-4 input-group-sm">
              <label for="text" class="col-md-3">
                URL
              </label>
              <input
                type="text"
                class="form-control"
                name="controller"
                value={this.state.formdata.controller}
                onChange={this.changeHandler}
                readOnly={this.state.show}
                required
              />
            </div>
            <div class="input-group mb-4 input-group-sm">
              <label for="text" class="col-md-3">
                Parent Menu
              </label>
              <select
                disabled={this.state.show}
                name="parent_id"
                value={this.state.formdata.parent_id}
                onChange={this.changeHandler}
              >
                {filter.map(row => (
                  <option value={row.code}>{row.name}</option>
                ))}
              </select>
            </div>
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

CreateMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  createMenu: PropTypes.func.isRequired,
  take: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  take: state.menu
});

export default connect(
  mapStateToProps,
  { createMenu }
)(CreateMenu);
