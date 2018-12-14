import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Label, FormGroup, co, Table } from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios"
import apiconfig from "../../../configs/api.config.json";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { getAllTsouveniritemview, getAllTsouveniritem, putApprove } from "../../../actions/tsouveniritemAction";
import { connect } from "react-redux";
import RejectRequest from "./rejectRequest";
import moment from 'moment';


const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  table: {
    minWidth: 700
  }
});

class AdminApprove extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: [],
      item: [],
      currentTsouveniritem: {},
    }
  }

  componentDidMount() {
    this.props.getAllTsouveniritemview()
    this.props.getAllTsouveniritem()
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      item: newProps.tsouveniritemview.tsv,
      result: newProps.tsouveniritemReducer.ts,
    });
  }

  func(input) {
    return input.map(a => {
      if (a.t_souvenir_id == this.props.tsouveniritem.code) {
        return a;
      }
    }).filter(b => b !== undefined)
  }

  designStatus = (status) => {
    switch (status) {
      case 0:
        return "Rejected";
      case 2:
        return "In Progress"
      case 3:
        return "Recieved by Requester"
      case 4:
        return "Settlement";
      case 5:
        return "Approved Settlement"
      case 6:
        return "Close Request"
      default:
        return "Submitted"
    }
  }

  approveHandler = () => {
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    //alert(apiconfig.BASE_URL + apiconfig.ENDPOINTS.TSOUVENIRITEMAPPROVE + '/' + this.props.tsouveniritem.code)
    let date = new Date();
    const formdata = {
      code: this.props.tsouveniritem.code,
      approved_by: userdata.username,
      approved_date: moment("approved_date").format('YYYY-MM-DD'),
      // approved_date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
      status: 2
    }
    // let token = localStorage.getItem(apiconfig.LS.TOKEN);
    // let option = {
    //   url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.TSOUVENIRITEMAPPROVE + '/' + this.props.tsouveniritem.code,
    //   method: "put",
    //   headers: {
    //     "Authorization": token,
    //     "Content-Type": "application/json"
    //   },
    //   data: formdata
    // }
    // axios(option).then((response) => {
    //   if (response.data.code === 200) {
    //     this.props.modalStatus(1, ("Request approved! " + this.props.tsouveniritem.code + " has been approved!"));
    //     this.props.history.push('/dashboard');
    //   } else {
    //     alert(response.data.message);
    //   }
    // })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // this.props.getAllTsouveniritemview()
    this.props.putApprove(formdata)
    this.props.getAllTsouveniritem()
    this.props.closeModalHandler()
  }

  rejectModalHandler = (tsouveniritemid) => {
    alert(tsouveniritemid)
    let tmp = {};
    this.state.result.map(ele => {
      //alert(JSON.stringify(ele))
      if (tsouveniritemid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentTsouveniritem: tmp,
      rejectRequest: true
    });
    //alert(JSON.stringify(this.state.currentTsouveniritem))
  }

  closeModalHandler = () => {
    this.setState({
      rejectRequest: false
    });
  }

  modalStatus(status, message, code) {
    this.setState({
      alertData: {
        status: status,
        message: message,
        code: code
      },
      viewCompany: false,
      editCompany: false,
      deleteCompany: false
    });
    // this.getListUnit();
  }

  render() {
    //alert(JSON.stringify(this.props))
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.approve} className={this.props.className}>
        <ModalHeader> Approve Souvenir Request - {this.props.tsouveniritem.code}</ModalHeader>
        <ModalBody>
          <div>
            {/* <h3>{this.props.tsouveniritem.code} </h3> */}
          </div>
          <RejectRequest
            reject={this.state.rejectRequest}
            closeModalHandler={this.closeModalHandler}
            tsouveniritem={this.state.currentTsouveniritem}
            modalStatus={this.modalStatus}
          />
          <div>
            <FormGroup>
              <Label for="">Transaction Code</Label>
              <Input type="text" name="code" placeholder="" value={this.props.tsouveniritem.code} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="">T Event Code</Label>
              <Input type="text" name="received_by" placeholder="" value={this.props.tsouveniritem.t_event_id} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="" >Request By</Label>
              <Input type="text" name="received_date" placeholder="" value={this.props.tsouveniritem.first_name_requester + " " + this.props.tsouveniritem.last_name_requester} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="">Request Date</Label>
              <Input type="text" name="note" placeholder="" value={this.props.tsouveniritem.request_date} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="">Due Date</Label>
              <Input type="text" name="note" placeholder="" value={this.props.tsouveniritem.request_due_date} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="">Note</Label>
              <Input type="text" name="note" placeholder="" value={this.props.tsouveniritem.note} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="">Status</Label>
              <Input type="text" name="note" placeholder="" value={this.designStatus(this.props.tsouveniritem.status)} readOnly />
            </FormGroup>
          </div>
          <div>
            <h5>Souvenir Item </h5>
          </div>
          <Table>
            <thead>
              <tr>
                <th>M Souvenir ID</th>
                <th>Qty</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {this.func(this.state.item).map((ele) => (
                <tr>
                  <td>
                    <Input type="text" name="name" placeholder={ele.name} value="" readOnly />
                  </td>
                  <td>
                    <Input type="text" name="note" placeholder={ele.qty} value="" readOnly />
                  </td>
                  <td>
                    <Input type="text" name="note" placeholder={ele.note} value="" readOnly />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.approveHandler}>
            Approve
          </Button>
          {/* {this.state.result.map((ele) => ( */}
          <Button color="danger" onClick={() => { this.rejectModalHandler(this.props.tsouveniritem._id) }}>
            Reject
          </Button>
          {/* )}} */}
          <Button color="warning" onClick={this.props.closeModalHandler}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

AdminApprove.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllTsouveniritemview: PropTypes.func.isRequired,
  getAllTsouveniritem: PropTypes.func.isRequired,
  putApprove: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tsouveniritemview: state.tsouveniritem,
  tsouveniritemReducer: state.tsouveniritem
});

export default connect(
  mapStateToProps,
  { getAllTsouveniritemview, getAllTsouveniritem, putApprove }
)(AdminApprove);
