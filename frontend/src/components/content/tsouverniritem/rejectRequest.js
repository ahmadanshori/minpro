import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Label, FormGroup, co, Table } from "reactstrap";
import axios from "axios"
import apiconfig from "../../../configs/api.config.json";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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

class RejectRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            code: "",
            reject_reason: ""
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            alertData: {
                status: false,
                message: ""
            }
        });
    }


    rejectHandler = () => {
        const formdata = {
            reject_reason: this.state.reject_reason,
            status: 0
        }
        //alert(apiconfig.BASE_URL + apiconfig.ENDPOINTS.TSOUVENIRITEMREJECT + '/' + this.props.tsouveniritem.code)
        //alert(JSON.stringify(formdata))
        let token = localStorage.getItem(apiconfig.LS.TOKEN);
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.TSOUVENIRITEMREJECT + '/' + this.props.tsouveniritem.code,
            method: "put",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            data: formdata
        }
        axios(option).then((response) => {
            if (response.data.code === 200) {
                this.props.modalStatus(2, ("Request Rejected! " + this.props.tsouveniritem.code + " has been rejected!"));
                this.props.history.push('/dashboard');
            } else {
                alert(response.data.message);
            }
        })
            .catch((error) => {
                console.log(error);
            })
        this.props.closeModalHandler()
    }

    render() {
        const { classes } = this.props;
        return (
            <Modal isOpen={this.props.reject} className={this.props.className}>
                <ModalHeader> Reject Reason </ModalHeader>
                <ModalBody>
                    <div>
                        {/* <h3>{this.props.tsouveniritem.code} </h3> */}
                    </div>
                    <div>
                        <FormGroup>
                            <Input type="text" name="reject_reason" placeholder="Input Reject Reason"
                                value={this.state.reject_reason} onChange={this.changeHandler} />
                        </FormGroup>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.rejectHandler}>
                        Reject
            </Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>
                        Cancel
            </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default RejectRequest;