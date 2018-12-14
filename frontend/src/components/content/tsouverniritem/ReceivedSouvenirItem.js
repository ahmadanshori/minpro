import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Label, FormGroup, co, Table } from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios"
import apiconfig from "../../../configs/api.config.json";
import { putReceivedSouvenir, getAllTsouveniritemview, getAllTsouveniritem } from "../../../actions/tsouveniritemAction";
import { connect } from "react-redux";
// import RejectRequest from "./rejectRequest";


const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  table: {
    minWidth: 700
  }
});

class ReceivedSouvenir extends React.Component {
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

  receivedHandler = () => {
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    let date = new Date();
    const formdata = {
      code: this.props.tsouveniritem.code,
      received_by: userdata.username,
      received_date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
      status: 3
    }
    // alert(JSON.stringify(formdata))
    // let token = localStorage.getItem(apiconfig.LS.TOKEN);
    // let option = {
    //   url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.TSOUVENIRITEMRECEIVED + '/' + this.props.tsouveniritem.code,
    //   method: "put",
    //   headers: {
    //     "Authorization": token,
    //     "Content-Type": "application/json"
    //   },
    //   data: formdata
    // }
    // axios(option).then((response) => {
    //   if (response.data.code === 200) {
    //     this.props.modalStatus(1, ("Data Updated ! Transaction souvenir request with code " + this.props.tsouveniritem.code + " has been received by requester !"));
    //     this.props.history.push('/dashboard');
    //   } else {
    //     alert(response.data.message);
    //   }
    // })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    this.props.putReceivedSouvenir(formdata)
    this.props.closeModalHandler()
    
  }

  render() {
    //alert(JSON.stringify(this.props))
    const { classes } = this.props;

    // response.data.code == 200
    //   ? this.props.modalStatus(1, "Data Updated!", this.state.formdata.code)
    //   : console.log(response.data.code);
      
    return (
      <Modal isOpen={this.props.approve} className={this.props.className}>
        <ModalHeader> Received Souvenir Request - {this.props.tsouveniritem.code}</ModalHeader>
        <ModalBody>
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
                    <Input type="text" name="note" placeholder={ele.name} value="" readOnly />
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
          <Button color="primary" onClick={this.receivedHandler}>
            Received
          </Button>
          <Button color="warning" onClick={this.props.closeModalHandler}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ReceivedSouvenir.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllTsouveniritemview: PropTypes.func.isRequired,
  putReceivedSouvenir: PropTypes.func.isRequired,
  getAllTsouveniritem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tsouveniritemview: state.tsouveniritem,
  tsouveniritemReducer: state.tsouveniritem
});

export default connect(
  mapStateToProps,
  { getAllTsouveniritemview, getAllTsouveniritem, putReceivedSouvenir }
)(ReceivedSouvenir);
