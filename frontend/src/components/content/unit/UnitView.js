import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

class ViewUnit extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        
            const { classes } = this.props;
            return (
                <Modal isOpen={this.props.view} className={this.props.className}>
                    <ModalHeader> View Unit</ModalHeader>
                    <ModalBody >

                    <div className={classes.root}>
                        <form class="form-inline">
                            <div class="input-group mb-3 input-group-sm">

                            <Grid item xs={6}>
                                <label for="text"> *Unit Code : </label>
                            </Grid>

                            <Grid item xs={6}>
                                <input type="text" class="form-control" readOnly
                                    name="code"
                                    value={this.props.unit.code}
                                    onChange={this.changeHandler} />
                            </Grid>
                            </div>

                            <div class="input-group mb-3 input-group-sm">
                            <Grid item xs={6}>
                                <label for="text"> *Unit Name : </label>
                            </Grid>
                                
                            <Grid item xs={6}>
                                <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                                    name="name"
                                    value={this.props.unit.name}
                                    onChange={this.changeHandler} />
                            </Grid>
                              
                            </div>
                            
                            <div class="input-group mb-3 input-group-sm">
                            <Grid item xs={6}>
                                <label for="text"> Description : </label>
                                </Grid>
                            <Grid item xs={6}>
                                <input type="text" class="form-control" placeholder="-" readOnly
                                    name="description"
                                    value={this.props.unit.description}
                                    onChange={this.changeHandler} />
                            </Grid>
                            </div>
                        </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.props.closeModalHandler}>Close</Button>
                    </ModalFooter>  
            </Modal>
            )
        }
    }
    ViewUnit.propTypes = {
        classes: PropTypes.object.isRequired,
      };
export default  withStyles(styles)(ViewUnit)