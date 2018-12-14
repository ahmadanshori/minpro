import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import PropTypes from "prop-types";
import { putMenu } from "../../../actions/menuActions";
import apiconfig from "../../../config/api.config.json";
import { connect } from "react-redux";
// import TextField from "@material-ui/core/TextField";
// import { Alert } from "reactstrap";

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

class EditMenu extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      formdata: {
        code: "",
        name: "",
        controller: "",
        parent_id: "",
        updated_by: userdata.username
      },
      status: "",
      alertData: {
        status: false,
        message: ""
      }
    };
  }

  changeHandler = e => {
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

  submitHandler = () => {
    // alert(JSON.stringify(this.state.formdata))
    if (
      this.state.formdata.code === "" ||
      this.state.formdata.name === "" ||
      this.state.formdata.controller === "" ||
      this.state.formdata.parent_id === ""
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "all forms must be filled!"
        }
      });
    } else {
      
      this.props.putMenu(this.state.formdata);
      this.props.modalStatus(1, "Updated!", this.state.formdata.code)
      this.props.closeModalHandler();
      this.props.getlist()
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      formdata: newProps.menutest,
      status: newProps.take.statusPUT
    });
  }

  render() {
    const { classes } = this.props;
    // this.state.status == 200
    //   ? this.props.modalStatus(1, "Updated!", this.state.formdata.code)
    //   : console.log(this.state.status);
    return (
      <Modal isOpen={this.props.edit} className={this.props.className}>
        <ModalHeader> Edit Menu</ModalHeader>
        <ModalBody>
          <label for="text"> Menu Code : </label>
          <form class="form">
              <input
                type="text"
                class="form-control"
                readOnly
                name="code"
                value={this.state.formdata.code}
                onChange={this.changeHandler}
              />
            </form>
            <form>
            <label for="text"> Menu Name :</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                name="name"
                value={this.state.formdata.name}
                onChange={this.changeHandler}
              />
            </div>
            </form>
              <label for="text"> URL : </label>
            <form>
              <input
                type="text"
                class="form-control"
                name="controller"
                value={this.state.formdata.controller}
                onChange={this.changeHandler}
              />
              </form> 
                <label for="text"> Parent : </label>
              <form>
                <input
                  type="text"
                  class="form-control"
                  readOnly
                  name="parent_id"
                  value={this.state.formdata.parent_id}
                  onChange={this.changeHandler}
                />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitHandler}
          >
            Update
          </Button>
          <Button variant="contained" onClick={this.props.closeModalHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

EditMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  putMenu: PropTypes.func.isRequired,
  take: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  take: state.menu
});

export default connect(
  mapStatetoProps,
  { putMenu }
)(EditMenu);
