import React from 'react'
import PropTypes from "prop-types"
import moment from "moment"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Alert } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { getEmployee } from "../../../actions/employeeAction";
import { getCompanies } from "../../../actions/companyAction";

import EditEmployee from './EditEmployee'
import CreateEmployee from './CreateEmployee'
import DeleteEmployee from './DeleteEmployee'
import ViewEmployee from './ViewEmployee'

import { Search, DeleteOutlined, CreateOutlined } from "@material-ui/icons";

class ListEmployee extends React.Component {
	constructor(props){
		super(props)
		this.state={
			initialSearch:{
				employee_id : /(?:)/,
				employee_name : /(?:)/,
				company : /(?:)/,
				created_date : /(?:)/,
				created_by : /(?:)/
			},
			showCreateEmployee:false,
			employee:[],
			hasil:[],
			currentEmployee:{},
			alertData: {
				status: 0,
        message: "",
        action:"",
        optional:"",
        code: ""
			},
			created_date:null,
      company:[],
      selectedCompany:{},
		}
	}

	deleteModalHandler = (employeeid) => {
		let tmp = {};
		this.state.employee.map(ele => {
			if (employeeid == ele._id) {
			tmp = ele;
		}
		});
		this.setState({
			currentEmployee: tmp,
			deleteEmployee: true
		});
	}

	viewModalHandler = (employeeid) => {
		let tmp = {};
		this.state.employee.map(ele => {
			if (employeeid == ele._id) {
				tmp = ele;
			}
		});
		this.setState({
			currentEmployee: tmp,
			viewEmployee: true
		});
	}

	editModalHandler = (employeeid) => {
		let tmp = {};
		this.state.employee.map(ele => {
			if (employeeid == ele._id) {
				tmp = ele
				this.setState({
					currentEmployee: tmp,
					editEmployee: true
				});
			}
		});
	}

	handleChangeCreatedDate = date => {
		let { initialSearch } = this.state
		if(date){
	    initialSearch["created_date"] = new RegExp(moment(date).format("DD/MM/YYYY"))
    }else{
    	initialSearch["created_date"] = /(?:)/
    }
    this.setState({
      initialSearch: initialSearch,
      created_date: date
    });
    this.SearchHandler()
	}

	changeHandler = event => {
		let { initialSearch } = this.state
		let { name, value } = event.target
		initialSearch[name] = new RegExp(value.toLowerCase())
    this.setState({
      initialSearch : initialSearch,
    });
    this.SearchHandler()
  };

	SearchHandler = () => {
		const {
			employee_id, employee_name,
			company, created_date,
			created_by
		} = this.state.initialSearch
		let test = [];
		this.state.employee.map(ele => {
			let fullName = ele.first_name + " " + ele.last_name
			if(
				( employee_id.test(ele.employee_number) ||
								employee_id.test("") )
				&&
				( employee_name.test(fullName.toLowerCase()) ||
								employee_name.test("") )
				&&
				( company.test(ele.m_company_id.toLowerCase()) ||
								company.test(""))
				&&
				( created_date.test(ele.created_date) ||
								created_date.test("") )
				&&
				( created_by.test(ele.created_by.toLowerCase()) ||
				 				created_by.test("") ) 
			){
				test.push(ele);
			}
		});
		this.setState({
			hasil: test,
		});
	}

	closeModalHandler = () => {
		this.setState({
			viewEmployee: false,
			editEmployee: false,
			deleteEmployee: false
		});
	}

	showHandler = () => {
		this.setState({ showCreateEmployee: true});
	}

	closeHandler = () => {
		this.setState({ showCreateEmployee: false });
	}

	componentDidMount = () => {
		this.props.getEmployee();
		this.props.getCompanies();
	}

	componentWillReceiveProps(newProp){
		this.setState({
			employee : newProp.employee.myEmployee,
			hasil : newProp.employee.myEmployee,
			company : newProp.company.companies
		})	
	}

	modalStatus = (status, action, message, optional, code) => {
    this.setState({
      alertData: {
        status: status,
        message: message,
        action: action,
        optional:optional,
        code: code
      },
      viewCompany: false,
      editCompany: false,
      deleteCompany: false
    });
  }

	render() {
		return (
			<div className='card border-primary'>
				<div className="card-header bg-primary text-white"><h4>List Employee</h4></div>
				<div className="card-body">
					<div className="col">
						<nav aria-label="breadcrumb">
							<ul className="breadcrumb">
								<li className="breadcrumb-item"><a href="#" >Home</a></li>
								<li className="breadcrumb-item"><a href="#">Master</a></li>
								<li className="breadcrumb-item active" aria-current="page">List Employee</li>
							</ul>
						</nav>
					</div>
					<div>
						{this.state.alertData.status == 1 ? (
              <Alert color="success">
                <b>Data {this.state.alertData.action} !</b>
                	{" " + this.state.alertData.message + " "} 
                <strong>{this.state.alertData.code}</strong>
                	{this.state.alertData.optional}
              </Alert>
	            ) : ("")
							}
							{this.state.alertData.status == 2 ? (
	              <Alert color="danger">
	                <b>Data {this.state.alertData.action} !</b>
	                	{" " + this.state.alertData.message + " "} 
	                <strong>{this.state.alertData.code}</strong>
	                	{this.state.alertData.optional}
	              </Alert>
	            ) : ("")
							}
						<button 
							type="button" 
							className="btn btn-primary float-right"
							onClick ={this.showHandler}
						>
							Add
						</button>
						<CreateEmployee
							create={this.state.showCreateEmployee}
							employee={this.state.employee}
							closeHandler={this.closeHandler}
							modalStatus={this.modalStatus}
							getList = {this.props.getEmployee}
						/>
						<ViewEmployee
							view={this.state.viewEmployee}
							closeModalHandler={this.closeModalHandler}
							currentEmployee={this.state.currentEmployee}
						/>
						<DeleteEmployee
							delete={this.state.deleteEmployee}
							currentEmployee={this.state.currentEmployee}
							closeModalHandler={this.closeModalHandler}
							modalStatus={this.modalStatus}
							getList = {this.props.getEmployee}
						/>
						<EditEmployee
							employee={this.state.employee}
							edit={this.state.editEmployee}
							closeModalHandler={this.closeModalHandler}
							currentEmployee={this.state.currentEmployee}
							modalStatus={this.modalStatus}
							getList = {this.props.getEmployee}
						/>
						<br/> <br/>
						<form>
							<div className="form-row align-items-center">
								<div className='col-md-2'>
									<input 
										placeholder="Employee ID" 
										className="form-control" 
										name="employee_id"
										onChange={this.changeHandler}
									/>
								</div>
								<div className='col-md-3'>
									<input 
										placeholder="Employee Name" 
										className="form-control" 
										name="employee_name"
										onChange={this.changeHandler}
									/>
								</div>
								<div className='col-md-3'>
									<select
		                name="company"
										className="form-control"
										onChange={this.changeHandler}
		              >
		              <option selected value="">Select Company...</option>
			              {this.state.company.map((row,x) => {
								      return (
								      	<option value={row.code}>{row.name}</option>
								    )})}
							    </select>
							   </div>
								<div className='col-md'>
									<DatePicker
		                className="form-control"
		                placeholderText="Created" 
		                name="created_date"
		                selected={this.state.created_date}
		                onChange={this.handleChangeCreatedDate}
		              />
								</div>
								<div className='col-md'>
									<input 
										placeholder="Created By" 
										name="created_by"
										className="form-control" 
										onChange={this.changeHandler}
									/>
								</div>
								<div className='col-md'>
									<button 
										type="button" 
										className="btn btn-warning float-right"
										onClick ={this.SearchHandler}
									>Search
									</button>
								</div>
							</div>
						</form>
						<table id="mytable" className="table table table-hover">
							<thead>
								<tr>
									<th>No.</th>
									<th>Employee Id Number</th>
									<th>Employee Name</th>
									<th>Company Name</th>
									<th>Created Date</th>
									<th>Created By</th>
									<th>Created By</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{this.state.hasil.map((row,x)=>
								<tr>
									<td>{x + 1}</td>
									<td>{row.employee_number}</td>
									<td>{row.first_name + " " + row.last_name}</td>
									<td>{row.m_company_name}</td>
									<td>{row.created_date}</td>
									<td>{row.created_by}</td>
									<td>{row.email}</td>
									<td>
									{/*<Link to='#'>
											<span 
												onClick = {() => {
													this.viewModalHandler(row._id)}
												} 
												className="fa fa-search" 
												style={
													{fontSize : '18px', paddingRight : '30px'}
												}
											/>
											<span 
												onClick = {() => {
													this.editModalHandler(row._id)}
												}	 
												className="fa fa-edit" 
												style={
													{fontSize : '18px', paddingRight : '30px'}
												} 
											/>
										</Link>*/}
										<Link to="#">
                      <Search
                      onClick={() => {
                      this.viewModalHandler(row._id);
                      }}
                      />
	                  </Link>
	                  <Link to="#">
                      <CreateOutlined
                      onClick={() => {
                      this.editModalHandler(row._id);
                      }}
                      />
	                  </Link>
	                  <Link to="#">
                      <DeleteOutlined
                      onClick={() => {
                      this.deleteModalHandler(row._id);
                      }}
                      />
                  	</Link>
									</td>
								</tr>
								)}
							 </tbody>
			      </table>
		      </div>
	      </div>
      </div>
     )
	}
}

ListEmployee.propTypes = {
  getEmployee: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  employee: state.employee,
  company: state.companyIndexReducer,
});

export default connect(
	mapStateToProps,{ getEmployee, getCompanies }
	)(ListEmployee);