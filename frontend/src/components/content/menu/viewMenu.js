import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  table: {
    minWidth: 700
  }
});

class ViewMenu extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.view} className={this.props.className}>
        <ModalHeader> View Unit</ModalHeader>
        <ModalBody>
          <div>
          <FormGroup>
              <Label for="">Menu Code</Label>
              <Input type="text" name="code" placeholder="" value={this.props.menu.code} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="">Menu Name</Label>
              <Input type="text" name="received_by" placeholder="" value={this.props.menu.name} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="" >Controller</Label>
              <Input type="text" name="received_date"  value={this.props.menu.controller} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="">Parent</Label>
              <Input type="text" name="note" placeholder="" value={this.props.menu.parent_id} readOnly />
            </FormGroup>
          </div>
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

ViewMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewMenu);
