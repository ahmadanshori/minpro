import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, FormGroup, Label, Input, Col, Row, Form, FormText, } from 'reactstrap'
import { connect } from "react-redux";
import axios from 'axios'
import PropTypes from "prop-types";
import apiconfig from '../../../configs/api.config.json'
import TextField from "@material-ui/core/TextField";
import Select from 'react-select'
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

import { getAllsouvenir } from "../../../actions/souvenirAction";
import { getAlltevent } from "../../../actions/teventAction";
import { getAllTsouveniritemview } from "../../../actions/tsouveniritemAction";

class EditTsouveniritem extends React.Component {
    constructor(props) {
        super(props)
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
        let date = new Date();
        super(props);
        this.state = {
            formdata: {
                code: '',
                t_event_code: '',
                request_by: userdata.m_employee_id,
                request_date: '',
                request_due_date: '',
                note: '',
                status: '',
                created_by: '',
                created_date: '',
                updated_by: '',
                updated_date: ''
            },
            selectedOption: "",
            selectedOption2: "",
            eventcode: [],
            souvenir: [],
            itemreq: [],
            updated_by: userdata.username,
            item: '',
            shareholders: [],
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        this.props.getAllsouvenir();
        this.props.getAlltevent();
        this.props.getAllTsouveniritemview()
    }

    getListEventCode() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN);
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.TEVENT,
            method: "get",
            headers: {
                Authorization: token
            }
        };
        axios(option)
            .then(response => {
                this.setState({
                    eventcode: response.data.message
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getListSouvenir() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN);
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.SOUVENIR,
            method: "get",
            headers: {
                Authorization: token
            }
        };
        axios(option)
            .then(response => {
                this.setState({
                    souvenir: response.data.message
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            formdata: newProps.tsouveniritemtest,
            souvenir: newProps.souvenir.souvenirReducer,
            eventcode: newProps.tevent.teventReducer,
            itemreq: newProps.tsouveniritemview.tsv,
        });
    }

    func(input) {
        return input.map(a => {
            if (a.t_souvenir_id == this.props.tsouveniritem.code) {
                return a;
            }
        }).filter(b => b !== undefined)
    }

    changeHandler(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
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

    submitHandler() {
        //alert(apiconfig.BASE_URL + apiconfig.ENDPOINTS.TSOUVENIRITEM + '/' + this.state.formdata.code)
        let token = localStorage.getItem(apiconfig.LS.TOKEN);
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.TSOUVENIRITEM + '/' + this.state.formdata.code,
            method: "put",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            data: this.state.formdata
        }
        axios(option).then((response) => {
            if (response.data.code === 200) {
                this.props.modalStatus(1, ("Data updated! " + this.state.formdata.code + " has been updated!"));
                this.props.history.push('/dashboard');
            } else {
                alert(response.data.message);
            }
        })
            .catch((error) => {
                console.log(error);
            })
        this.props.closeModalHandler()
        this.props.getAllsouvenir();
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
        alert(`Incorporated: ${item} with ${shareholders.length} shareholders`);
    }

    handleAddShareholder = () => {
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
        let date = new Date();
        this.setState({
            shareholders: this.state.shareholders.concat([{
                m_souvenir_id: "",
                qty: "",
                note: "",
                updated_by: userdata.username,
                updated_date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                is_delete: false
            }])
        });
    }

    handleRemoveShareholder = (idx) => () => {
        this.setState({
            shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
        });
    }

    render() {
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

        return (
            <Modal isOpen={this.props.edit} className={this.props.className} >
                <ModalHeader> Edit Souvernir Request - {this.state.formdata.code}</ModalHeader>
                <ModalBody >
                    <form>
                        <FormGroup>
                            <Label for="">Transaction Code</Label>
                            <Input type="text" name="code" placeholder="Auto Generate" value={this.state.formdata.code} readOnly />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Event Code</Label>
                            <Input type="text" name="t_event_code" placeholder="Auto Generate" value={this.state.formdata.t_event_code} readOnly />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Request By</Label>
                            <Input type="text" name="request_by" placeholder={this.state.updated_by} value={this.state.formdata.request_by} onChange={this.changeHandler} readOnly />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Request Date</Label>
                            <Input type="date" name="request_date" placeholder={this.state.request_date} value={this.state.formdata.request_date} onChange={this.changeHandler} readOnly />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Request Due Date</Label>
                            <Input type="date" name="request_due_date" placeholder="" value={this.state.formdata.request_due_date} onChange={this.changeHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Note</Label>
                            <Input type="text" name="note" placeholder="" value={this.state.formdata.note} onChange={this.changeHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Status</Label>
                            <Input type="text" name="status" placeholder="" value={this.designStatus(this.state.formdata.status)} onChange={this.changeHandler} readOnly />
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
                                                value={shareholder.qty} onChange={this.handleShareholderNameChange(idx)} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="exampleNote">Note</Label>
                                            <Input type="text" name={"note"} id="exampleNote"
                                                value={shareholder.m_souveninoter_id} onChange={this.handleShareholderNameChange(idx)} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={1}>
                                        <Label for="exampleNote">Edit</Label>
                                        <CreateOutlinedIcon size="small" class="fa fa-trash" />
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
                    <Button color="primary" onClick={this.submitHandler}>Update</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

EditTsouveniritem.propTypes = {
    classes: PropTypes.object.isRequired,
    EditTsouveniritem: PropTypes.func.isRequired,
    getAllsouvenir: PropTypes.func.isRequired,
    getAlltevent: PropTypes.func.isRequired,
    tsouveniritem: PropTypes.object.isRequired,
    souvenir: PropTypes.object.isRequired,
    tevent: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    tsouveniritem: state.tsouveniritem,
    souvenir: state.souvenirIndexReducer,
    tevent: state.teventIndexReducer,
    tsouveniritemview: state.tsouveniritem
});

export default connect(
    mapStateToProps,
    { EditTsouveniritem, getAllsouvenir, getAlltevent, getAllTsouveniritemview }
)(EditTsouveniritem);