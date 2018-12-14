import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Label, FormGroup, co, Table } from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios"
import apiconfig from "../../../configs/api.config.json";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { getAllTsouveniritemview, getAllTsouveniritem } from "../../../actions/tsouveniritemAction";
import { connect } from "react-redux";
import RejectRequest from "./rejectRequest";


const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  table: {
    minWidth: 700
  }
});

class SettlementSouvenir extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: [],
      item: [],
      currentTsouveniritem: {},
      qty: null,
      qty_settlement: null
    }
  }

  componentDidMount() {
    this.props.getAllTsouveniritemview()
    this.props.getAllTsouveniritem()
  }

  componentWillReceiveProps(newProps) {
    // alert(JSON.stringify(newProps))
    this.setState({
      item: newProps.tsouveniritemview.tsv,
      result: newProps.tsouveniritemReducer.ts,
      // qty: newProps.tsouveniritemReducer.tsv.qty

    });
    // alert(JSON.stringify(this.state.qty))
  }

  func(input) {
    let qty1 = []
    return input.map(a => {
      // alert(JSON.stringify(a))
      if (a.t_souvenir_id == this.props.tsouveniritem.code) {
        qty1.push(a.qty)
        return a;   
      }
    }).filter(b => b !== undefined)
    
    this.setState({
      qty : qty1
    })
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

  settlementHandler = () => {
    
    let qty_settlement = parseInt(this.state.item.length.qty) - this.state.qty
    // if(m_souvenir_id == )
    alert(JSON.stringify(qty_settlement))
    const formdata = {
      status: 4,
      
    }
    // let token = localStorage.getItem(apiconfig.LS.TOKEN);
    // let option = {
    //   url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.TSOUVENIRITEMSETTLEMENT + '/' + this.props.tsouveniritem.code,
    //   method: "put",
    //   headers: {
    //     "Authorization": token,
    //     "Content-Type": "application/json"
    //   },
    //   data: formdata
    // }
    // axios(option).then((response) => {
    //   if (response.data.code === 200) {
    //     this.props.modalStatus(1, ("Data Settlement Saved! Transaction souvenir settlement with code " + this.props.tsouveniritem.code + " has been submitted!"));
    //     this.props.history.push('/dashboard');
    //   } else {
    //     alert(response.data.message);
    //   }
    // })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // this.props.closeModalHandler()
  }

  closeModalHandler = () => {
    this.setState({
      rejectRequest: false
    });
  }
  changeHandler = e => {
    // let qty_actual = {}
    let {name, value} = e.target
    // alert(JSON.stringify(name))
    
    this.setState({
        qty : value
      });
      // alert(this.state.qty)
  }
  changeByIndex = (index) => (event) => {
    const newQty = this.state.item.map((ele, tatang) => {
      if (index !== tatang) return ele;
      return {...ele, [event.target.name]: event.target.value};
    })
    this.setState({ item: newQty})
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
    const { classes } = this.props;
    // alert(JSON.stringify(this.state.item))
    return (
      <Modal isOpen={this.props.approve} className={this.props.className}>
        <ModalHeader> Settlement Souvenir Request - {this.props.tsouveniritem.code}</ModalHeader>
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
                <th>Qty Actual</th>
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
                    <Input type="text" name="qty" placeholder={ele.qty} id="" value="" readOnly/>
                  </td>
                  <td>
                    <Input type="text" name="qty_actual" placeholder="" value={this.state.qty} onChange={this.changeByIndex(ele)}/>
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
          <Button color="primary" onClick={this.settlementHandler}>
            Settlement
          </Button>
          <Button color="warning" onClick={this.props.closeModalHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

SettlementSouvenir.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllTsouveniritemview: PropTypes.func.isRequired,
  getAllTsouveniritem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tsouveniritemview: state.tsouveniritem,
  tsouveniritemReducer: state.tsouveniritem
});

export default connect(
  mapStateToProps,
  { getAllTsouveniritemview, getAllTsouveniritem }
)(SettlementSouvenir);
