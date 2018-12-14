import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../config/api.config.json'

class ViewRole extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View Unit</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *Role Code : </label>
                        <input type="text" class="form-control" readOnly
                        name="code" 
                        value={this.props.role.code} 
                        onChange={this.changeHandler} />
                        <label for="text"> *Role Name : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="name" 
                        value={this.props.role.name} 
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="input-group mb-3 input-group-sm"> 
                    <label for="text"> description : </label>
                        <input type="text" class="form-control" placeholder="description" readOnly
                        name="description" 
                        value={this.props.role.description} 
                        onChange={this.changeHandler}/>
                   </div>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.closeModalHandler}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ViewRole