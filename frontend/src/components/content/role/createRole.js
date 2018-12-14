import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../config/api.config.json'
import { func } from 'prop-types';

class CreateRole extends React.Component{
    constructor (props){
        super(props);
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
        this.state = {
            formdata:{
                code:'',
                name:'',
                description:'',
            }
        }
        
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    
    changeHandler(e){
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata: tmp
        })
    }
    
    submitHandler(){
        if(this.state.formdata.name === ""){
            return alert("All field must be Filled!");
        }
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.ROLE,
            method: "post",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        axios(option).then((response)=>{
            if(response.data.code === 200){
                const func = (prototype, digit, len) => {
                    let trueLen = digit - len.toString().length
                    for(let i = 0; i < trueLen; i++){
                        prototype += 0;
                    }
                    return (prototype += len);
                }
                this.props.closeHandler();
                this.props.modalStatus(1, ("Data Saved! New role has been add with code " + func("RO", 4, (response.data.message + 1)) + "!"));
                this.props.history.push('/role');
            } else {
                alert(response.data.message);
            }
        }).catch((error)=>{
            console.log(error);            
        })
    }
    render(){
        return(
            <Modal isOpen = {this.props.create} className = {this.props.className}>
                <ModalHeader>Add Company</ModalHeader>
                <ModalBody >
                <form>
                <div class = "input-group mb-4 input-group-sm">
                    <label for = "code" class = "col-md-3">Role ID</label>
                    <input type = "text" placeholder = "Auto Generated" class = "form-control" readOnly 
                    name = "code" value = {this.state.formdata.code} onChange = {this.changeHandler} />
                </div>
                <div class = "input-group mb-4 input-group-sm">
                    <label for = "text" class="col-md-3">Name Role</label>
                    <input type = "text" class="form-control" placeholder = "Type Role Name" 
                    name = "name" value = {this.state.formdata.name} onChange = {this.changeHandler} required/>
                </div>
                <div class = "input-group mb-4 input-group-sm">
                    <label for = "text" class = "col-md-3">Description</label>
                    <input type = "text" class = "form-control" placeholder = "Type Description" 
                    name = "description" value = {this.state.formdata.description} onChange = {this.changeHandler} required/>
                </div>              
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color = "primary" onClick = {this.submitHandler}>Save</Button>
                    <Button color = "warning" onClick = {this.props.closeHandler}>Cancel</Button>
                </ModalFooter>
        </Modal>
        )
    }
}
export default CreateRole