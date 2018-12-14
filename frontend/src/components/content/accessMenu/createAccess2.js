import React from "react";
import ReactDOM from "react-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import apiconfig from "../../../config/api.config.json";
import OutlinedInput from "@material-ui/core/OutlinedInput";
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateAccess extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      formdata: {
        m_role_id: "",
        name_role: "",
        m_menu_id: [],
        created_by: userdata.username,
        update_by: userdata.username
      },
      theAccess: [],
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0,
      role: [],
      menu: [],
      samsul:[],
      checkedOne : false,
      theRole: '',
      open: false,
      nilai: (len)=>{
          let samsul = [];
          for(let i=0; i<len; i++){
              samsul.push(0);
          }
          return samsul;
      },
      nilai2:[],
      nilai3:[]
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.getListRole();
    this.getListMenu();
  }
  changeHandler(e) {
    let tmp = this.state.formdata;
    //alert(e.target.value);
    tmp[e.target.name] = e.target.value;
    this.setState({
      alertData: {
        status: false,
        message: ""
      },
      formdata: tmp
    });
  }

  getListRole() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ROLE,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    axios(option)
      .then(response => {
        this.setState({
          role: response.data.message
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  getListMenu() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.MENU,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    axios(option)
      .then(response => {
        this.setState({
          menu: response.data.message
        });
      })
      .catch(error => {
        console.log(error);
      });
      this.state.nilai3 = this.state.nilai(this.state.menu.length);
  }

  submitHandler() {
    this.state.formdata.m_role_id = this.props.access[1];
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
      this.state.formdata.m_menu_id = this.state.nilai2;
      if(this.state.formdata.m_menu_id !=''){
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ACCESS + '/' + this.state.formdata.m_role_id,
            method: "put",
            headers: {
              Authorization: token,
              "Content-Type": "application/json"
            },
            data: this.state.formdata.m_menu_id
          };
          axios(option).then(response => {
                this.state.nilai2 = this.state.nilai3 = [];
                this.props.modalStatus2();
            }).catch(error => {
              console.log(error);
            });
      }
      else{
          alert("Fill the Role!!")
      }
  }

  handleChange = (name) => event => {
    this.setState({ [name]: event.target.checked });
    let index = parseInt(event.target.value);
    if(event.target.checked){
        this.state.nilai3[index] = this.state.menu[index].code;
        this.state.nilai2 = this.state.nilai3.filter(e=>e!=0);
    }
    else{
        this.state.nilai3[index] = 0
        this.state.nilai2 = this.state.nilai3.filter(e=>e!=0);
    }    
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }
  getChecked = (code) => {
    let data =  this.props.theAccess.filter(a=>a==code);

      if(data.length!==0){
        return true
      }
      else{
        return false
      }
  }

  render() {
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader>Add/Edit Access</ModalHeader>
        <ModalBody>
        <form autoComplete="off">
        <FormControl className={classes.formControl}>
        <label for="text"><h5>{this.props.access[0]}</h5></label>
        </FormControl>
      </form>
          <div className={classes.container}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Select the role</FormLabel>
              
              <FormGroup>
                {this.state.menu.map((row, index) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleChange(String(row.name))}
                          value={index}
                        />
                      }
                      label={row.name}
                    />
                  );
                })}
              </FormGroup>
              <FormHelperText>Be careful</FormHelperText>
            </FormControl>
          </div>
        </ModalBody>
        <ModalFooter>
          {this.state.alertData.status == true ? (
            <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitHandler}
          >
            Save
          </Button>
          <Button variant="contained" onClick={this.props.closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

CreateAccess.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateAccess);
