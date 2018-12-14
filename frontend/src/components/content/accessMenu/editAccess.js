import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../config/api.config.json'

class EditAccess extends React.Component {
    constructor (props) {
        super(props)
        let userdata =JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        
        super(props)
        this.state = {
            formdata: {
                code : '',
                name: '',
                address: '',
                update_by : userdata.usename
            }
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            formdata : newProps.accesstest
        })
    }
 

    changeHandler(e) {
        let tmp = this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })   
    }

    submitHandler() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY +'/'+ this.state.formdata._id,
            method: "put",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata   
        }
       // alert(JSON.stringify(option));
        axios(option)
        .then((response) => { 
            //alert(this.state.formdata)
            if(response.data.code === 200) {
                this.props.modalStatus(1, "Success");
                this.props.history.push('/dashboard')
                //this.props.closeModalHandler()
            } else {
                alert(response.data.message)
            }
        })
        .catch((error) => {
            console.log(error);            
        })
    }

    render(){
        //console.log(this.state.formdata)
        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader> Edit Access</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *Access Code : </label>
                        <input type="text" class="form-control" readOnly
                        name="code" 
                        value={this.state.formdata.code}  
                        onChange={this.changeHandler} />
                        <label for="text"> *Access Name : </label>
                        <input type="text" class="form-control" 
                        name="name" 
                        value={this.state.formdata.name} 
                        onChange={this.changeHandler} />
                    </div>
                
                    <div class ="input-group mb-3 input-group-sm"> 
                    <label for="text"> email : </label>
                        <input type="text" class="form-control"
                        name="email" 
                        value={this.state.formdata.email} 
                        onChange={this.changeHandler}/>
                    <label for="text"> address : </label>
                        <input type="text" class="form-control"
                        name="address" 
                        value={this.state.formdata.address} 
                        onChange={this.changeHandler}/>
                    </div>
                    
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text"> phone : </label>
                        <input type="text" class="form-control"
                        name="phone" 
                        value={this.state.formdata.phone} 
                        onChange={this.changeHandler}/>
                   </div>
                   
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditAccess