import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewEmployee extends React.Component {
  render(){
    return(
      <Modal isOpen={this.props.view} className="modal-dialog modal-lg border-primary card">
        <ModalHeader className="bg-primary text-white card-header"> View Employee -
          {" "+this.props.currentEmployee.first_name
            +" "+this.props.currentEmployee.last_name+" {"+
            this.props.currentEmployee.employee_number+"}"}
        </ModalHeader>
        <ModalBody className="card-body">
          <form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label text-right">* Emp ID Number</label>
              <div className="col-sm-4">
                <input 
                  type="text" 
                  class="form-control" 
                  readOnly
                  name="code" 
                  value={this.props.currentEmployee.employee_number} 
                  onChange={this.changeHandler}
                />
              </div>
              <label className="col-sm-2 col-form-label text-right">* Company Name</label>
              <div className="col-sm-4">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Type Unit Name" 
                  readOnly
                  name="name" 
                  value={this.props.currentEmployee.m_company_name} 
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label text-right">* First Name</label>
              <div className="col-sm-4">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="email" 
                  readOnly
                  name="email" 
                  value={this.props.currentEmployee.first_name} 
                  onChange={this.changeHandler}
                />
              </div>
              <label className="col-sm-2 col-form-label text-right">Email</label>
              <div className="col-sm-4">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Type address" 
                  readOnly
                  name="address" 
                  value={this.props.currentEmployee.email} 
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label text-right">Last Name</label>
              <div className="col-sm-4">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Last Name" readOnly
                  name="last_name" 
                  value={this.props.currentEmployee.last_name} 
                  onChange={this.changeHandler}
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={this.props.closeModalHandler}
          >Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ViewEmployee