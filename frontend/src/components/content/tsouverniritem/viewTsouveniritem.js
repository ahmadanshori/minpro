import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Label, FormGroup, co, Table } from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios"
import apiconfig from "../../../configs/api.config.json";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { getAllTsouveniritemview } from "../../../actions/tsouveniritemAction";
import { connect } from "react-redux";


const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  table: {
    minWidth: 700
  }
});

class ViewTsouveniritem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: []
    }
  }

  componentDidMount() {
    this.props.getAllTsouveniritemview()
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      item: newProps.tsouveniritemview.tsv,
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
        return "Done!"
      default:
        return "Submitted"
    }
  }

  render() {
    //alert(JSON.stringify(this.props))
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.view} className={this.props.className}>
        <ModalHeader> View Transaction Souvenir Request - {this.props.tsouveniritem.code}</ModalHeader>
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
              <Input type="text" name="received_date" placeholder="" value={this.props.tsouveniritem.first_name_requester+" "+this.props.tsouveniritem.last_name_requester} readOnly />
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
          <Button color="danger" onClick={this.props.closeModalHandler}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ViewTsouveniritem.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllTsouveniritemview: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tsouveniritemview: state.tsouveniritem,
});

export default connect(
  mapStateToProps,
  { getAllTsouveniritemview }
)(ViewTsouveniritem);
