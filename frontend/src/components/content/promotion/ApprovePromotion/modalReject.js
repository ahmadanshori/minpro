import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
  Col,
  Label,
  FormGroup,
  Alert
} from "reactstrap";
import { putPromotion } from "../../../../actions/promotionActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class modalReject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertData: {
        status: false,
        message: ""
      },
      status: null,
      flag: false
    };
    this.SubmitHandler = this.SubmitHandler.bind(this);
  }

  changeReason = e => {
    let tmp = this.props.promotion;
    tmp["reject_reason"] = e.target.value;
    this.setState({
      alertData: {
        status: false,
        message: ""
      }
    });
  };

  SubmitHandler() {
    if (this.props.promotion.reject_reason == null) {
      this.setState({
        alertData: {
          status: true,
          message: "please insert a reject reason"
        }
      });
    } else {
      this.setState({ flag: true });
      let form = this.props.promotion;
      form["status"] = 0;
      this.props.putPromotion(form);
      this.props.closeModalHandler();
      setTimeout(() => {
        window.location.href = "/promotion";
      }, 3000);
    }
  }

  componentWillReceiveProps(newStatus) {
    this.setState({
      status: newStatus.ambil.statusPUT
    });
  }

  render() {
    this.state.status === 200 && this.state.flag === true
      ? this.props.modalStatus(1, "Rejected!")
      : console.log(this.state.status);
    return (
      <Modal isOpen={this.props.show} className={this.props.className}>
        <ModalHeader>Reject Transaction Promotion</ModalHeader>
        <ModalBody>
          <p>
            Are you sure want to Reject{" "}
            <strong>{this.props.promotion.title}</strong> with code
            <strong> {this.props.promotion.code}</strong> Transaction ?
          </p>
          <FormGroup row>
            <Label for="rejectreason" sm={2}>
              Reject Reason
            </Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="reject_reason"
                id="reject_reason"
                value={this.props.promotion.reject_reason}
                onChange={this.changeReason}
              />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <div>
            {this.state.alertData.status === true ? (
              <Alert color="danger">{this.state.alertData.message} </Alert>
            ) : (
              ""
            )}
          </div>
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

modalReject.propTypes = {
  putPromotion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ambil: state.promot
});

export default connect(
  mapStateToProps,
  { putPromotion }
)(modalReject);
