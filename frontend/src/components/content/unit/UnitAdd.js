import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import { Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { createUnit } from '../../actions/unitAction'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

const userdata = JSON.parse(localStorage.getItem('B176_USERDATA_KEY'))
class CreateUnit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formdata: {
                code: '',
                name: '',
                description: '',
                is_delete: false,
                created_by: userdata.m_employee_id
            },
            alertdata: {
                stat: '',
                message: '',
            },
            units: [],

        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            units: newProps.units.unitData,
        })
    }
    changeHandler(e) {
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata: tmp
        })

    }
    submitHandler() {
        if (this.state.formdata.name == '') {
            this.setState({
                alertdata: {
                    stat: 2,
                    message: 'Field Name tidak boleh kosong'
                }
            })
        } else {
            this.props.createUnit(this.state.formdata)
            this.props.closeModalHandler()
        }

    }
    render() {
        const { stat, message } = this.state.alertdata
        const { classes } = this.props;
        return (

            <Modal isOpen={this.props.create} className={this.props.className}>
                <ModalHeader> Add Unit</ModalHeader>
                <ModalBody >

                    {stat == 2 && (
                        <Alert color="danger">
                            {message}
                        </Alert>
                    )
                    }
                    <div className={classes.root}>
                        <form className="form-inline">
                            <div className="input-group mb-3 input-group-sm">
                                <Grid item xs={6}>
                                    <label htmlFor="text">Unit Code</label>
                                </Grid>
                                <Grid item xs={6}>
                                    <input type="text" className="form-control"
                                        placeholder="Auto Generated" readOnly
                                        name="code" value={this.state.formdata.code}
                                        onChange={this.changeHandler} />
                                </Grid>
                            </div>
                            <div className="input-group mb-3 input-group-sm">
                                <Grid item xs={6}>
                                    <label htmlFor="text">Unit Name</label>
                                </Grid>
                                <Grid item xs={6}>
                                    <input type="text" className="form-control"
                                        placeholder="Type Unit Name"
                                        name="name" value={this.state.formdata.name}
                                        onChange={this.changeHandler} required />
                                </Grid>
                            </div>
                            <div className="input-group mb-3 input-group-sm">
                                <Grid item xs={6}>
                                    <label htmlFor="text">Description</label>
                                </Grid>
                                <Grid item xs={6}>
                                    <input type="description  " className="form-control"
                                        placeholder="Type Description"
                                        name="description" value={this.state.formdata.description}
                                        onChange={this.changeHandler} required />
                                </Grid>
                            </div>
                        </form>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

CreateUnit.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    units: state.units
})
const style = withStyles(styles)(CreateUnit)
const konek = connect(mapStateToProps, { createUnit })
export default (konek)(style)
