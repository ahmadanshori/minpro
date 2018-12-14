import React from 'react'
import API from '../../../helpers/API';
import apiconfig from '../../../config/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditRole from './editRole';
import CreateRole from './createRole';
import { Alert } from 'reactstrap'
import DeleteRole from './deleteRole'
import ViewRole from './viewRole'
import $ from 'jquery'
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Datel from '@material-ui/icons/DateRangeOutlined'
class ListRole extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showCreateRole: false,
            role: [],
            currentRole: {},
            alertData: {
                status: 0,
                message: ''
            }
        }
        this.showHandler = this.showHandler.bind(this);
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
        this.state.role.map((ele) => {
            if (roleid == ele._id) {
                tmp = ele;
            }
        })
        this.setState({
            currentRole : tmp,
            deleteRole : true
        })
    }
//for view action
    viewModalHandler(roleid) {
        let tmp = {};
        this.state.role.map((ele) => {
            if (roleid == ele._id) {
                tmp = ele;
            }
        })
        this.setState({
            currentRole : tmp,
            viewRole : true
        })
    }
//for update action
    editModalHandler(roleid){
        let tmp = {};
        this.state.role.map((ele) => {
            if (roleid == ele._id) {
                tmp = ({
                    _id: ele._id,
                    code: ele.code,
                    name: ele.name,
                    description: ele.description,
                    updated_by: ele.updated_by});
                this.setState({                      
                    currentRole : tmp,
                    editRole : true
                })
            }
        });}
//close pop up for modal (used in update, veiw, delete)
    closeModalHandler(){
        this.setState({
            viewRole : false,
            editRole : false,
            deleteRole : false    
        });
    }
//show pop up for modal (used in update, veiw, delete)
    showHandler(){
        this.setState({showCreateRole:true});
    }
//close pop for create
    closeHandler(){
        this.setState({showCreateRole:false});
    }
    
//get list when load
    getListRole() {        
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
                role: response.data.message
            });
        }).catch((error)=>{
            console.log(error);                        
        })
    }
//mount before render  
    componentDidMount(){
        this.getListRole()
    }
    modalStatus(status, message){
        this.getListRole()
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            viewRole : false,
            editRole : false,
            deleteRole : false    
        })
    }
     
    render(){
    return (
        <div>
            <ul class="breadcrumb">
                <li><a href="#">Home</a> <span class="divider">/</span></li>
                <li><a href="#">Master</a> <span class="divider">/</span></li>
                <li class="active">List Role</li>
            </ul>
        
            <div class="container">
            <h4>List Role</h4>

            {(this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''}
            {(this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''}

                
                <CreateRole 
                    create = {this.state.showCreateRole}
                    modalStatus = {this.modalStatus}
                    closeHandler={this.closeHandler} 
                />
                <ViewRole
                    view = {this.state.viewRole}
                    closeModalHandler = {this.closeModalHandler} 
                    role = {this.state.currentRole}
                />
                <DeleteRole
                    delete = {this.state.deleteRole}
                    role = {this.state.currentRole}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                 />
                <EditRole
                    edit = {this.state.editRole}
                    closeModalHandler = {this.closeModalHandler}
                    roletest = {this.state.currentRole} 
                    modalStatus = {this.modalStatus}
                />
                <br/> <br/>
                <div class = 'form-row'>
                <div class = 'col-md-2'>
                    <input class = 'form-control' placeholder = '-Search Role Code-' />
                </div>
                <div class = 'col-md-2'>
                    <input class = 'form-control' placeholder = '-Search Role Name-' />
                </div>
                {/* <div class='col-sm-6'>
                    <div class="form-group">
                        <div class='input-group date' id='datetimepicker1'>
                            <input type='text' class="form-control" />
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div> */}
                </div>
                
                <Grid item xs={6} justify="flex-end">
                    
                    <Input
                      placeholder="Search"
                    />
                    <Button
                      variant="contained"
                    >
                      Search

                    </Button>
                    <Button color="primary" size="small" variant="contained" onClick ={this.showHandler}> Add </Button>
                </Grid>
                <Grid item xs={6} justify="flex-end"></Grid>
                <br/>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Role Code</TableCell>
                      <TableCell>Role Name</TableCell>
                      <TableCell>Created By</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  {this.state.role.map((content)=>
                    <TableRow>
                        <TableCell>{content.code}</TableCell>
                        <TableCell>{content.name}</TableCell>
                        <TableCell>{content.created_by}</TableCell>
                        <TableCell>{content.created_date}</TableCell>
                        <TableCell>
                            <Link to='#'>
                                <span onClick = {() => {this.viewModalHandler(content._id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight 
                                : '30px'}} />    
                                <span onClick = {() => {this.editModalHandler(content._id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                                <span onClick = {() => {this.deleteModalHandler(content._id)}} class="fa fa-trash" style={{fontSize : '18px'}} />
                            </Link>
                        </TableCell>
                    </TableRow>
                    )}
                </Table>
        </div>
        </div>)
    }
}

export default ListRole