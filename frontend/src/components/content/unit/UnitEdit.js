import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import PropTypes from "prop-types";
import { Alert } from 'reactstrap'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { upUnit } from '../../../actions/unitAction'

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
const userdata = JSON.parse(localStorage.getItem('B159_USERDATA_KEY'))
class EditUnit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formdata: {
                code: '',
                name: '',
                description: '',
                updated_by: '',
            },
            alertdata: {
                stat: '',
                message: ''
            }
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps.currentUnit)
        this.setState({
            formdata: newProps.currentUnit
        })
    }

    changeHandler(e) {

        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        tmp['updated_by'] = userdata.username
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
        }else{
            this.props.upUnit(this.state.formdata)
            this.props.refresh()
            this.props.closeModalHandler()
        }

    }

    render() {
        let {  edit,currentUnit, alertData, closeModalHandler } = this.props
        let {stat,message}=this.state.alertdata
        const head = currentUnit.description
        return (
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader> Edit Unit - {head} ({currentUnit.code})</ModalHeader>
                <ModalBody >

                    {stat == 2 && (
                        <Alert color="danger">
                            {message}
                        </Alert>
                    )
                    }
                    <form class="form-inline">
                        <div class="input-group mb-3 input-group-sm">
                            <Grid item xs={6}>
                                <label for="text"> *Unit Code : </label>
                            </Grid>
                            <Grid item xs={6}>
                                <input type="text" class="form-control" readOnly
                                    name="code"
                                    value={this.state.formdata.code}
                                />
                            </Grid>
                        </div>
                        <div class="input-group mb-3 input-group-sm">
                            <Grid item xs={6}>
                                <label for="text"> *Unit Role : </label>
                            </Grid>
                            <Grid item xs={6}>
                                <input type="text" class="form-control"
                                    name="name"
                                    value={this.state.formdata.name}
                                    onChange={this.changeHandler} />
                            </Grid>
                        </div>
                        <div class="input-group mb-3 input-group-sm">
                            <Grid item xs={6}>
                                <label for="text"> description : </label>
                            </Grid>
                            <Grid item xs={6}>
                                <input type="text" class="form-control"
                                    name="description"
                                    value={this.state.formdata.description}
                                    onChange={this.changeHandler} />
                            </Grid>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
EditUnit.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    units: state.units
})
const style = withStyles(styles)(EditUnit)
const konek = connect(mapStateToProps, { upUnit })
export default (konek)(style)
