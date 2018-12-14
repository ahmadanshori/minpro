import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import {delUnit} from '../../actions/unitAction'
import {connect} from 'react-redux'
class DeleteUnit extends React.Component {
    deleteHandler=()=>{
        
        this.props.delUnit(this.props.unit.code)
        this.props.closeModalHandler()
    }
    render(){
        return(
            <Modal isOpen={this.props.delete} className={this.props.className}>
                <ModalHeader> Delete Unit <b>{this.props.unit.code}</b> </ModalHeader>
                <ModalBody >
                    <p> Are you sure you want to delete <b>{this.props.unit.name}</b> ? </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.deleteHandler}>Yes</Button>
                    <Button color="danger" onClick={this.props.closeModalHandler}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
const mapStateToProps=state=>({
    units:state.units
  })
export default connect(mapStateToProps,{delUnit})(DeleteUnit)