import React from 'react'
import API from '../../../helpers/API';
import apiconfig from '../../../config/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditAccess from './editAccess';
import CreateAccess from './createAccess';
import { Alert } from 'reactstrap'
import DeleteAccess from './deleteAccess'
import ViewAccess from './viewAccess'
import $ from 'jquery'

class ListAccess extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showCreateAccess: false,
            access: [],
            currentAccess: {},
            alertData: {
                status: 0,
                message: ''
            }
        }
        this.showHandler = this.showHandler.bind(this);
        //this.submitHandler=this.submitHandler.bind(this)
        // this.changeHandler=this.changeHandler.bind(this)
        this.unitHandler=this.unitHandler.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
        this.closeHandler=this.closeHandler.bind(this);
        this.deleteModalHandler = this.deleteModalHandler.bind(this);
        this.viewModalHandler = this.viewModalHandler.bind(this);
        this.editModalHandler = this.editModalHandler.bind(this);
        this.modalStatus = this.modalStatus.bind(this);
    }
//for delete action
    deleteModalHandler(roleid) {
        let tmp = {};
        this.state.access.map((ele) => {
            if (roleid == ele._id) {
                tmp = ele;
            }
        })
        this.setState({
            currentAccess : tmp,
            deleteAccess : true
        })
    }
//for view action
    viewModalHandler(roleid) {
        let tmp = {};
        this.state.access.map((ele) => {
            if (roleid == ele._id) {
                tmp = ele;
            }
        })
        this.setState({
            currentAccess : tmp,
            viewAccess : true
        })
    }
//for update action
    editModalHandler(roleid){
        let tmp = {};
        this.state.access.map((ele) => {
            if (roleid == ele._id) {
                tmp = ({
                    _id: ele._id,
                    code: ele.code,
                    name: ele.name,
                    description: ele.description,
                    updated_by: ele.updated_by});
                this.setState({                      
                    currentAccess : tmp,
                    editAccess : true
                })
            }
        });}
//close pop up for modal (used in update, veiw, delete)
    closeModalHandler(){
        this.setState({
            viewAccess : false,
            editAccess : false,
            deleteAccess : false    
        });
    }
//show pop up for modal (used in update, veiw, delete)
    showHandler(){
        this.setState({showCreateAccess:true});
    }
//close pop for create
    closeHandler(){
        this.setState({showCreateAccess:false});
    }

    // changeHandler(e){
    //     let tmp=this.state.formdata
    //     tmp[e.target.name]=e.target.value
    //     this.setState({
    //         formdata:tmp
    //     })
    // }
    
    unitHandler(e){
        let tmp = this.state.formdata;
        tmp.m_unit_id = e.target.value;
        this.setState({
            formdata: tmp
        })
    }
//get list when load
    getListAccess() {        
        let token = localStorage.getItem(apiconfig.LS.TOKEN);
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ROLE,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option).then((response)=>{
            this.setState({
                access: response.data.message
            });
        }).catch((error)=>{
            console.log(error);                        
        })
    }
//mount before render  
    componentDidMount(){
        this.getListAccess()
    }
    modalStatus(status, message){
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            viewAccess : false,
            editAccess : false,
            deleteAccess : false    
        })
    }
     
    render(){
    return (
        <div>
            <ul class="breadcrumb">
                <li><a href="#">Home</a> <span class="divider">/</span></li>
                <li><a href="#">Master</a> <span class="divider">/</span></li>
                <li class="active">List Access</li>
            </ul>
        
            <div class="container">
            <h4>List Access</h4>

            {(this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''}
            {(this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''}

                <button type="button" class="btn btn-primary float-right" onClick ={this.showHandler}> Add </button>
                <CreateAccess 
                    create = {this.state.showCreateAccess}
                    modalStatus = {this.modalStatus}
                    closeHandler={this.closeHandler} 
                />
                <ViewAccess
                    view = {this.state.viewAccess}
                    closeModalHandler = {this.closeModalHandler} 
                    access = {this.state.currentAccess}
                />
                <DeleteAccess
                    delete = {this.state.deleteAccess}
                    access = {this.state.currentAccess}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                 />
                <EditAccess
                    edit = {this.state.editAccess}
                    closeModalHandler = {this.closeModalHandler}
                    roletest = {this.state.currentAccess} 
                    modalStatus = {this.modalStatus}
                />
                <br/> <br/>
                <form class = "form-inline">
                    <div class = "container">
                        <input type = "text" placeholder = "Access Code" class = "col-sm-3 padding=5px" id = "text"/>
                        <input type = "text" placeholder = "Access Name" class = "col-sm-3 padding=5px" id = "text"/>
                        <input type = "date" placeholder = "Created date" class = "col-sm-3 padding=5px datepicker" id = "date"/>
                        <input type = "text" placeholder = "Created By" class = "col-sm-2 padding=5px" id = "text"/>
                        
                        <button type="button" class="btn btn-warning float-right " onClick ={this.searchHandler}> Search </button>
                    </div>
                </form>
                <table id="mytable" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Access Code</th>    
                            <th>Access Name</th>
                            <th>Created Date</th>
                            <th>Created By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {                         
                            this.state.access.map((ele,x)=>
                                <tr>
                                    <td>{x+1}</td>
                                    <td>{ele.code}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.created_date}</td>
                                    <td>{ele.created_by}</td>
                                    <td>
                                        <Link to='#'>
                                            <span onClick = {() => {this.viewModalHandler(ele._id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />    
                                            <span onClick = {() => {this.editModalHandler(ele._id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                                            <span onClick = {() => {this.deleteModalHandler(ele._id)}} class="fa fa-trash" style={{fontSize : '18px'}} />
                                        </Link>
                                    </td>
                                </tr>)
                       }
                    </tbody>
                </table>
        </div>
        </div>)
    }
}

export default ListAccess