import React from "react";
import moment from "moment";
import apiconfig from "../../../../config/api.config.json";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { putPromotion } from "../../../../actions/promotionActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class modalApprove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      flag: false
    };
    this.SubmitHandler = this.SubmitHandler.bind(this);
  }

  SubmitHandler() {
    this.setState({ flag: true });
    const today = moment().format("DD/MM/YYYY");
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    let form = this.props.promotion;
    form["status"] = 2;
    form["approved_by"] = userdata.employee_id;
    form["approved_date"] = today;
    this.props.putPromotion(form);
    this.props.closeModalHandler();
    setTimeout(() => {
      window.location.href = "/promotion";
    }, 3000);
  }

  componentWillReceiveProps(newStatus) {
    this.setState({
      status: newStatus.bujang.statusPUT
    });
  }

  render() {
    this.state.status === 200 && this.state.flag === true
      ? this.props.modalStatus(1, "Approved!")
      : console.log(this.state.status);
    return (
      <Modal isOpen={this.props.show} className={this.props.className}>
        <ModalHeader>Approve Transaction Promotion</ModalHeader>
        <ModalBody>
          <p>
            Are you sure want to approve{" "}
            <strong>{this.props.promotion.title}</strong> with code
            <strong> {this.props.promotion.code}</strong> Transaction ?
          </p>
          <p>
            This Proposal Asign to {this.props.promotion.assign_to} with note{" "}
            {this.props.promotion.note}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.SubmitHandler}>
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

modalApprove.propTypes = {
  putPromotion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  bujang: state.promot
});

export default connect(
  mapStateToProps,
  { putPromotion }
)(modalApprove);
