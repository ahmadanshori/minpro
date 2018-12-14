import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { delUser } from "../../../actions/userActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler() {
    this.props.delUser(this.props.user._id);
    this.props.closeModalHandler();
  }

  componentWillReceiveProps(newStatus) {
    this.setState({
      status: newStatus.bujang.statusDEL
    });
  }

  render() {
    this.state.status === 200
      ? this.props.modalStatus(1, "Deleted!", this.props.user.username)
      : console.log(this.state.status);

    return (
      <Modal isOpen={this.props.delete} className={this.props.className}>
        <ModalHeader> Delete Company </ModalHeader>
        <ModalBody>
          <p>
            Are you sure want delete <strong>{this.props.user.username}</strong>{" "}
            User ?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.deleteHandler}>
            Yes
          </Button>
          <Button color="danger" onClick={this.props.closeModalHandler}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

DeleteUser.propTypes = {
  delUser: PropTypes.func.isRequired,
  bujang: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bujang: state.useray
});

export default connect(
  mapStateToProps,
  { delUser }
)(DeleteUser);
