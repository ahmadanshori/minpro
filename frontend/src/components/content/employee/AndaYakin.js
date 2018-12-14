import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class AndaYakin extends React.Component {
  render(){
    return(
      <Modal isOpen={this.props.andaYakin} className="modal-dialog modal-sm">
        <ModalHeader className="">
          Alert
        </ModalHeader>
        <ModalBody>
          <p>Anda Yakin ? </p>
        </ModalBody>
        <ModalFooter>
          <Button 
            color="primary" 
            type="submit"
            onClick ={this.props.submitHandler}
          >Ya</Button>
          <Button 
            color="warning"
            onClick={this.props.ubahYakinTidak}
          >Tidak</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default AndaYakin
