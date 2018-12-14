import React from "react";
import moment from "moment";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { putPromotion } from "../../../../actions/promotionActions";
import { putPromotionItem } from "../../../../actions/promotionItemActions";
import { putPromotionFile } from "../../../../actions/promotionFileActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class modalClose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null
    };
    this.SubmitHandler = this.SubmitHandler.bind(this);
  }

  SubmitHandler() {
    const today = moment().format("DD-MM-YYYY");
    let form = this.props.promotion;
    form["status"] = 3;
    form["close_date"] = today;
    this.props.putPromotion(form);
    this.props.putPromotionItem(this.props.item);
    this.props.putPromotionFile(this.props.file);
    this.props.closeModalHandler();
    setTimeout(() => {
      window.location.href = "/promotion";
    }, 3000);
  }
  componentWillReceiveProps(newStatus) {
    this.setState({
      status: newStatus.ambil.statusPUT
    });
  }

  render() {
    this.state.status === 200
      ? this.props.modalStatus(1, "Closed Request!")
      : console.log(this.state.status);
    return (
      <Modal isOpen={this.props.show} className={this.props.className}>
        <ModalHeader>Close Transaction Promotion</ModalHeader>
        <ModalBody>
          <p>
            Are you sure want to close{" "}
            <strong>{this.props.promotion.title}</strong> with code
            <strong> {this.props.promotion.code}</strong> Transaction ?
          </p>
          <p>Maybe you want check start date and end date again</p>
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

modalClose.propTypes = {
  putPromotion: PropTypes.func.isRequired,
  putPromotionItem: PropTypes.func.isRequired,
  putPromotionFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ambil: state.promot
});

export default connect(
  mapStateToProps,
  { putPromotion, putPromotionItem, putPromotionFile }
)(modalClose);
