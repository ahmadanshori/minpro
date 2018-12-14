import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Col, Row, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import apiconfig from "../../../configs/api.config.json";
import { connect } from "react-redux";
import Select from 'react-select'
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { createTsouveniritem } from "../../../actions/tsouveniritemAction";
import { getAllsouvenir } from "../../../actions/souvenirAction";
import { getAlltevent } from "../../../actions/teventAction";
//import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateTsouveniritem extends React.Component {
  componentDidMount() {
    this.props.getAllsouvenir();
    this.props.getAlltevent()
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      souvenir: newProps.souvenir.souvenirReducer,
      eventcode: newProps.tevent.teventReducer
    });
  }

  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    let date = new Date();
    this.state = {
      code: "",
      request_by: userdata.m_employee_id,
      request_date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
      due_date: "",
      note: "",
      shareholders: [],
      created_by: userdata.username,
      created_date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
      selectedEventCode: "",
      selectedSouvenir: "",
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0,
      selectedOption: "",
      selectedOption2: "",
      eventcode: [],
      souvenir: [],
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
      alertData: {
        status: false,
        message: ""
      }
    });
  }

  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, [evt.target.name]: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  }

  handleSubmit = (evt) => {
    const { item, shareholders } = this.state;
    //alert(`Incorporated: ${item} with ${shareholders.length} shareholders`);
  }

  handleAddShareholder = () => {
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    let date = new Date();
    this.setState({
      shareholders: this.state.shareholders.concat([{
        m_souvenir_id: "",
        qty: "",
        note: "",
        created_by: userdata.username,
        created_date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
        is_delete: false
      }])
    });
  }

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  }

  handleChange1 = (selectedOption) => {
    this.setState({
      selectedOption,
      selectedEventCode: selectedOption.value
    });
  };

  handleChange2 = (selectedOption2) => {
    this.setState({
      selectedOption2,
      selectedSouvenir: selectedOption2
    });
  };

  submitHandler() {
    const formdata = {
      code: this.state.code,
      t_event_id: this.state.selectedEventCode,
      request_by: this.state.request_by,
      request_date: this.state.request_date,
      request_due_date: this.state.due_date,
      status: 1,
      note: this.state.note,
      created_by: this.state.created_by,
      created_date: this.state.created_date,
    }
    let datas = [formdata, this.state.shareholders]
    this.props.createTsouveniritem(datas)
    this.props.modalStatus(1, "Created!", formdata.code)
    this.props.closeHandler();
  }

  render() {
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));

    const options1 = []
    this.state.eventcode.map(row => {
      options1.push({
        value: row.code,
        label: row.event_name
      })
    })

    const options2 = []
    this.state.souvenir.map(row => {
      options2.push({
        value: row.code,
        label: row.name
      })
    })

    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader> Add Souvenir Request </ModalHeader>
        <ModalBody>
          {/* <form className={classes.container}> */}
          <form>
            <FormGroup>
              <Label for="">Transaction Code</Label>
              <Input type="text" name="code" placeholder="Auto Generated" readOnly />
            </FormGroup>
            <formGroup variant="outlined"
            // className={classes.formGroup}
            >
              <Label for="">Event Code</Label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange1}
                options={options1}
              />
            </formGroup>
            <FormGroup>
              <Label for="">Request By</Label>
              <Input type="text" name="request_by" placeholder={userdata.m_employee_id} value={this.state.request_by} onChange={this.changeHandler} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="">Request Date</Label>
              <Input type="text" name="request_date" placeholder={this.state.created_date} value={this.state.request_date} onChange={this.changeHandler} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="">Due Date</Label>
              <Input type="date" name="due_date" placeholder="" value={this.state.due_date} onChange={this.changeHandler} />
            </FormGroup>
            <FormGroup>
              <Label for="">Note</Label>
              <Input type="textarea" name="note" placeholder="" value={this.state.note} onChange={this.changeHandler} />
            </FormGroup>
            <Button variant="contained" color="primary" size="small" onClick={this.handleAddShareholder}>
              Add Item
            </Button>
            {this.state.shareholders.map((shareholder, idx) => (
              <div className="shareholder">
                <Row form>
                  <Col md={5}>
                    <FormGroup>
                      <Label for="m_souvenir_id">Souvenir Item</Label>
                      {/* <Select 
                        name = "m_souvenir_id"
                        id= "m_souvenir_id"
                        // value = {this.shareholder.m_souvenir_id}
                        // value={this.state.selectedOption2}
                        onChange={this.handleShareholderNameChange(idx)}
                        options={options2}
                      /> */}
                      <select name="m_souvenir_id" id="m_souvenir_id" class="form-control"
                        value={shareholder.m_souvenir_id} onChange={this.handleShareholderNameChange(idx)}>
                        {this.state.souvenir.map(row => <option value={row.code}>{row.name}</option>)}
                        <option value="" disabled>
                          {" "}-{" "}
                        </option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="exampleQty">Qty</Label>
                      <Input type="text" name="qty" id="exampleQty"
                        onChange={this.handleShareholderNameChange(idx)}
                        value={shareholder.qty} />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleNote">Note</Label>
                      <Input type="text" name={"note"} id="exampleNote" onChange={this.handleShareholderNameChange(idx)} />
                    </FormGroup>
                  </Col>
                  <Col md={1}>
                    <Label for="exampleNote">Edit</Label>
                    <CreateOutlinedIcon size="small" class="fa fa-trash" onChange={this.handleRemoveShareholder} />
                  </Col>
                  <Col md={1}>
                    <Label for="exampleNote">Delete</Label>
                    <DeleteOutlinedIcon size="small" onClick={this.handleRemoveShareholder(idx)} class="fa fa-trash" />
                  </Col>
                </Row>
              </div>
            ))}
          </form>
        </ModalBody>
        <ModalFooter>
          {this.state.alertData.status == true ? (
            <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
              ""
            )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitHandler}
          >
            Save
          </Button>
          <Button variant="contained" onClick={this.props.closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

CreateTsouveniritem.propTypes = {
  classes: PropTypes.object.isRequired,
  createTsouveniritem: PropTypes.func.isRequired,
  getAllsouvenir: PropTypes.func.isRequired,
  getAlltevent: PropTypes.func.isRequired,
  tsouveniritem: PropTypes.object.isRequired,
  souvenir: PropTypes.object.isRequired,
  tevent: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  tsouveniritem: state.tsouveniritem,
  souvenir: state.souvenirIndexReducer,
  tevent: state.teventIndexReducer
});

export default connect(
  mapStateToProps,
  { createTsouveniritem, getAllsouvenir, getAlltevent }
)(CreateTsouveniritem);
