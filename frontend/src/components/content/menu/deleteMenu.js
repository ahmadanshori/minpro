import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { delMenu } from "../../../actions/menuActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";

class DeleteMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
    // this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler = () => {
    this.props.delMenu(this.props.menu.code);
    this.props.closeModalHandler();
    this.props. getlist();
  }

  componentWillReceiveProps(newStatus) {
    this.setState({
      status: newStatus.take.statusDEL
    });
  }

  render() {
    this.state.status == 200
      ? this.props.modalStatus(1, "Deleted!", this.props.menu.code)
      : console.log(this.state.status);

    return (
      <Modal isOpen={this.props.delete} className={this.props.className}>
        <ModalHeader> Delete Menu </ModalHeader>
        <ModalBody>
          <p>
            Are you sure want delete <strong>{this.props.menu.name}</strong>{" "}
            Menu ?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.deleteHandler}>
            Delete
          </Button>
          <Button color="danger" onClick={this.props.closeModalHandler}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

DeleteMenu.propTypes = {
  delMenu: PropTypes.func.isRequired,
  take: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  take: state.menu
});

export default connect(
  mapStateToProps,
  { delMenu }
)(DeleteMenu);
