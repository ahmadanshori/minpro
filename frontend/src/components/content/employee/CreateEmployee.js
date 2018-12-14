import React from 'react'
import PropTypes from "prop-types"
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import { connect } from "react-redux";
import { createEmployee, getEmployee } from "../../../actions/employeeAction";
import { getCompanies } from "../../../actions/companyAction";
import apiconfig from '../../../config/api.config.json'
import FileYaknin from './AndaYakin'

class CreateEmployee extends React.Component{
  constructor (props){
    super(props)
    let userdata =JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
    this.state={
      formdata:{
        employee_number:'',
        m_company_id:'',
        first_name:'',
        last_name:'',
        email:'',
        created_by:userdata.username
      },
      company:[],
      employee:[],
      selectedCompany: '',
      statusCreated : null,
      messageCreated :null,
      andaYakin : false,
      validate : {
        validateFirsname : "form-control", 
        validateEmail : "form-control",
        validateCompany : "form-control"
      },
      regexEmail : /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      employee : newProps.employee.myEmployee,
      company : newProps.company.companies,
      statusCreated : newProps.employee.statusCreated,
      messageCreated : newProps.employee.idCreated
    })
  }

  componentDidMount(){
    this.props.getCompanies();
  }

  changeHandler = (e) => {
    let { formdata, validate, regexEmail, employee } = this.state
    let { validateFirsname, validateCompany, validateEmail } = validate
    let { name, value, id } = e.target

    formdata[name] = value
    if( name=="email" && value != '' && regexEmail.test(value) ){
      employee.map((ele)=>{
        if(ele.email == value){
          validate[id] = "form-control is-invalid"
        }
      })
    }else if( name=="email" && regexEmail.test(value) && value != '' ){
      validate[id] = "form-control is-valid"
    }else if(
      ( name=="email" && value != '' ) ||
      ( name=="m_company_id" && value=="" ) ||
      ( name=="first_name" && value=="" )
    ){
      validate[id] = "form-control is-invalid"
    }else{
      validate[id] = "form-control is-valid"
    }
    
    this.setState({
      formdata:formdata,
      validate: validate
    })
  }


  submitHandler = () => {
    let { formdata, validate, employee,  regexEmail } = this.state
    let { email, first_name, m_company_id } = formdata
    let emailJikaAda = ''
    employee.map((ele)=>{
        if(ele.email == email){
          emailJikaAda = ele.email
        }
      })

    if( m_company_id == "" ){
      alert( "Select Company!" )
    }else if( first_name == '' ){
      alert( "Type First Name!" )
    }
    else if(  email == emailJikaAda ) {
      alert( "Email Sudah Ada!" )
    }
    else if( !regexEmail.test(email) && email != ''){
      alert( "Email Incorrect!" )
    }else{
      this.props.createEmployee(formdata)
      this.props.closeHandler()
    }
  }

  ubahYakinYa = () => {
    this.setState({andaYakin : true})
  }
  ubahYakinTidak = () => {
    this.setState({andaYakin : false})
  }

  render(){
    // status, action, message, optional, code
    if(this.state.statusCreated == 200){
      this.props.modalStatus(1, 'Saved',
        'Data Employee has been add with Employee ID Number',
        "",
        this.state.messageCreated.employee_number)
    }else if (this.state.statusCreated != 200 &&
       this.state.statusCreated != null){
      this.props.modalStatus(2, 'Failed')
    }

    return(
    <div>
      <Modal isOpen={this.props.create} className="modal-dialog modal-lg border-primary card">
        <ModalHeader className="bg-primary text-white card-header">
            Add Employee
        </ModalHeader>
        <ModalBody className="card-body">
          <FileYaknin
            andaYakin={this.state.andaYakin}
            ubahYakinTidak={this.ubahYakinTidak}
            submitHandler={this.submitHandler}
          />
          <div className="form-control">
            <form class="needs-validation">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label text-right">* Emp ID Number</label>
                <div className="col-sm-4">
                  <input
                    type="text" 
                    className="form-control" 
                    placeholder="" 
                    readOnly
                    name="code" 
                    value={this.state.formdata.employee_number} 
                    onChange={this.changeHandler}
                  />
                </div>
                <label for="validateCompany" className="col-sm-2 col-form-label text-right">* Company Name</label>
                <div className="col-sm-4">
                  <select
                    id="validateCompany"
                    name="m_company_id"
                    className={this.state.validate.validateCompany}
                    onChange={this.changeHandler}
                  >
                  <option selected value="">Select Company...</option>
                    {this.state.company.map((row,x) => {
                      return (
                        <option value={row.code}>{row.name}</option>
                    )})}
                  </select>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                  <div className="invalid-feedback">
                    Please Select Company!.
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label for="validateFirsname" className="col-sm-2 col-form-label text-right">* First Name</label>
                <div className="col-sm-4">
                  <input 
                    type="text"
                    id="validateFirsname"
                    className={this.state.validate.validateFirsname} 
                    placeholder="First Name" 
                    name="first_name" 
                    value={this.state.formdata.first_name} 
                    onChange={this.changeHandler} 
                    required 
                  />
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                  <div className="invalid-feedback">
                    Please Type First Name!.
                  </div>
                </div>
                <label for="validateEmail" className="col-sm-2 col-form-label text-right">Email</label>
                <div className="col-sm-4">
                  <input 
                    id="validateEmail"
                    type="text" 
                    class={this.state.validate.validateEmail} 
                    placeholder="email" 
                    name="email" 
                    value={this.state.formdata.email} 
                    onChange={this.changeHandler} 
                    required
                  />
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                  <div className="invalid-feedback">
                    Email Is Incorrect!.
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label text-right">Last Name</label>
                <div className="col-sm-4">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Last Name" 
                    name="last_name" 
                    value={this.state.formdata.last_name} 
                    onChange={this.changeHandler} 
                    required
                  />
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button 
            color="primary" 
            type="submit"
            onClick ={this.ubahYakinYa}
          >Save</Button>
          <Button 
            color="warning"
            onClick={this.props.closeHandler}
          >Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    
    )
  }
}

CreateEmployee.propTypes = {
  createEmployee: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  getEmployee: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  employee: state.employee,
  company: state.companyIndexReducer,
  status : state.employee.statusCreated,
});

export default connect(
  mapStateToProps,{ getEmployee, createEmployee, getCompanies }
  )(CreateEmployee);