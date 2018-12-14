import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
// Form Components
import TextField from "../common/TextFieldGroup";

class ViewSouvenir extends Component {
  // Function to Get Units Name
  getUnits = code => {
    let name = "";
    if (code !== "") {
      this.props.units.forEach(unit => {
        if (unit.code === code) {
          name = unit.name;
        }
      });
    } else {
      name = code;
    }

    return name;
  };

  render() {
    return (
      <Modal isOpen={this.props.view}>
        <ModalHeader>
          <div className="lead">
            View Souvenir -{" "}
            {`${this.props.souvenir.name} (${this.props.souvenir.code})`}
          </div>
        </ModalHeader>
        <ModalBody>
          <form>
            <TextField
              label="Souvenir Code"
              placeholder={this.props.souvenir.code}
              disabled={true}
            />
            <TextField
              label="Souvenir Name"
              placeholder={this.props.souvenir.name}
              disabled={true}
            />
            <TextField
              label="Unit Name"
              placeholder={this.getUnits(this.props.souvenir.m_unit_id)}
              disabled={true}
            />
            <TextField
              label="Description"
              placeholder={this.props.souvenir.description}
              disabled={true}
            />
            <div className="form-group text-right">
              <button
                type="button"
                className="btn btn-default"
                onClick={this.props.closeModal}
              >
                Close
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

ViewSouvenir.propTypes = {
  closeModal: PropTypes.func.isRequired,
  souvenir: PropTypes.object.isRequired,
  units: PropTypes.array.isRequired,
  view: PropTypes.bool.isRequired
};

export default ViewSouvenir;
