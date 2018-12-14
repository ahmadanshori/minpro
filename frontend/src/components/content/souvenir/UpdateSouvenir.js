import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import { updateSouvenir } from "../../actions/souvenirAction";
// Form Components
import TextField from "../common/TextFieldGroup";
import SelectList from "../common/SelectListGroup";
// Form Validation
import isEmpty from "../../validation/isEmpty";

class UpdateSouvenir extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      code: "",
      name: "",
      m_unit_id: "",
      description: "",
      units: [],
      title: "",
      errorName: "",
      errorUnit: ""
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      _id: newProps.souvenir._id,
      code: newProps.souvenir.code,
      name: newProps.souvenir.name,
      m_unit_id: newProps.souvenir.m_unit_id,
      description: newProps.souvenir.description,
      units: newProps.units,
      title: newProps.souvenir.name,
      errorName: newProps.errorName,
      errorUnit: newProps.errorUnit
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // Clear Error State Unit
    if (e.target.name === "name") {
      this.setState({
        errorName: ""
      });
    }
    // Clear Error State Unit
    if (e.target.name === "m_unit_id") {
      this.setState({
        errorUnit: ""
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    // Validate Form
    if (isEmpty(this.state.name)) {
      this.setState({ errorName: "This Field is Required" });
    }
    if (isEmpty(this.state.m_unit_id)) {
      this.setState({ errorUnit: "This Field is Required" });
    }

    if (!isEmpty(this.state.name) && !isEmpty(this.state.m_unit_id)) {
      const souvenirData = {
        name: this.state.name,
        m_unit_id: this.state.m_unit_id,
        description: this.state.description,
        updated_by: this.props.m_employee_id
      };
      // Update Souvenir from Database
      this.props.updateSouvenir(this.state._id, souvenirData);
      // Clear All State
      this.setState({
        name: "",
        m_unit_id: "",
        description: "",
        errorName: "",
        errorUnit: ""
      });
      // Close Modal
      this.props.closeModal();
    }
  };

  render() {
    const options = [];
    options.push({ label: "*Select Unit Name", value: "" });
    this.state.units.forEach(unit =>
      options.push({
        label: unit.name,
        value: unit.code
      })
    );

    return (
      <Modal isOpen={this.props.update}>
        <ModalHeader>
          <div className="lead">
            Edit Souvenir - {`${this.state.title} (${this.state.code})`}
          </div>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={this.onSubmit}>
            <TextField
              placeholder="Auto Generated"
              label="*Souvenir Code"
              name="code"
              value={this.state.code}
              disabled={true}
            />
            <TextField
              placeholder="Type Souvenir Name"
              label="*Souvenir Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              errors={this.state.errorName}
            />
            <SelectList
              label="*Unit Name"
              placeholder="*Select Unit Name"
              name="m_unit_id"
              value={this.state.m_unit_id}
              onChange={this.onChange}
              options={options}
              errors={this.state.errorUnit}
            />
            <TextField
              placeholder="Type Description"
              label="*Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            />
            <div className="form-group text-right">
              <input
                type="submit"
                className="btn btn-primary mr-2"
                value="Update"
                onClick={this.onSubmit}
              />
              <button
                type="button"
                className="btn btn-default"
                onClick={this.props.closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

UpdateSouvenir.propTypes = {
  updateSouvenir: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  souvenir: PropTypes.object.isRequired,
  units: PropTypes.array.isRequired,
  update: PropTypes.bool.isRequired,
  m_employee_id: PropTypes.string.isRequired
};

export default connect(
  null,
  { updateSouvenir }
)(UpdateSouvenir);
