import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  table: {
    minWidth: 700
  }
});

class ViewUser extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.view} className={this.props.className}>
        <ModalHeader> View Unit</ModalHeader>
        <ModalBody>
          <div>
            <h3>{this.props.user.name} </h3>
            <h5>{this.props.user.m_employee_id} </h5>
          </div>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                User Name
                <br />
                User Role ID
                <br />
                Name Role
                <br />
                User Employee ID
                <br />
                Company Name
                <br />
                Created By
                <br />
                Created Date
                <br />
                Updated By
                <br />
                Updated Date
              </Grid>
              <Grid item xs={6}>
                {this.props.user.username}
                <br />
                {this.props.user.m_role_id}
                <br />
                {this.props.user.role_name}
                <br />
                {this.props.user.m_employee_id}
                <br />
                {this.props.user.company_name}
                <br />
                {this.props.user.created_by}
                <br />
                {this.props.user.created_date}
                <br />
                {this.props.user.updated_by}
                <br />
                {this.props.user.updated_date}
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

ViewUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewUser);
