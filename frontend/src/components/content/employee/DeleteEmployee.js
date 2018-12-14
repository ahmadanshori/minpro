import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { deleteEmployee } from "../../../actions/employeeAction";

class DeleteCompany extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statusDeleted : null
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      statusDeleted : newProps.employee.statusDeleted,
    })
  }

  deleteHandler = () => {   
    this.props.deleteEmployee(this.props.currentEmployee._id)
    this.props.closeModalHandler()
  }

  render(){
    if(this.state.statusDeleted == 200){
      this.props.modalStatus(1, 'Deleted',
        'Data Employee with Employee ID Number',
        " has been deleted!",
        this.props.currentEmployee.employee_number)
      this.props.closeModalHandler()
    }else if (this.state.statusDeleted == 403){
      this.props.modalStatus(2, 'Failed',
      'Data Employee with Employee ID Number',
      " has been Relation With User!",
      this.props.currentEmployee.employee_number)
    }
    return(
    <Modal isOpen={this.props.delete} className={this.props.className}>
      <ModalHeader> Delete Company </ModalHeader>
      <ModalBody >
        <p> Delete Data </p>
      </ModalBody>
      <ModalFooter>
      <Button 
        color="primary" 
        onClick={this.deleteHandler}
      >Yes</Button>
      <Button 
        color="danger" 
        onClick={this.props.closeModalHandler}
      >No</Button>
      </ModalFooter>
    </Modal>
    )
  }
}

DeleteCompany.propTypes = {
  deleteEmployee: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  employee: state.employee,
});

export default connect(
  mapStateToProps,{ deleteEmployee }
  )(DeleteCompany);