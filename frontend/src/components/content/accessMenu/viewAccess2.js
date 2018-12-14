import React from "react";
import ReactDOM from "react-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
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
      menu: []
    };

  }
  componentDidMount() {
    this.getListMenu();
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
        <ModalHeader>{'View Access ' + '(' +this.props.access[0] + ')'} </ModalHeader>
        <ModalBody>
              <FormGroup>
                {this.state.menu.map((row, index) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.getChecked(row.controller)}
                        />
                      }
                      label={row.name}
                    />
                  );
                })}
              </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant="contained" onClick={this.props.closeHandler}>
            Close
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
