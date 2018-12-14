import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import apiconfig from "../../../config/api.config.json";

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  table: {
    minWidth: 700
  }
});

class ViewCompany extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.view} className={this.props.className}>
        <ModalHeader> View Unit</ModalHeader>
        <ModalBody>
          <div>
            <h3>{this.props.company.name} </h3>
          </div>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                Company Code
                <br />
                Company Name
                <br />
                Company Email
                <br />
                Phone Number
                <br />
                Company Address
                {/* <br />
                Province
                <br />
                City */}
              </Grid>
              <Grid item xs={6}>
                {this.props.company.code}
                <br />
                {this.props.company.name}
                <br />
                {this.props.company.email}
                <br />
                {this.props.company.phone}
                <br />
                {this.props.company.address}
                {/* <br />
                {this.props.company.province}
                <br />
                {this.props.company.city} */}
              </Grid>
            </Grid>
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

ViewCompany.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewCompany);
