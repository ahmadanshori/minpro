import React from "react";
import apiconfig from "../../../config/api.config.json";
import PropTypes from "prop-types";
import {
  Badge,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Repass from "./repass";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getNotifAdmin, getNotifStaff } from "../../../actions/loginActions";

class Home extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      userdata: {
        username: userdata.username,
        m_role_id: userdata.role_id,
        m_employee_id: userdata.employee_id
      },
      alertData: {
        status: 0,
        message: "",
        code: ""
      },
      notifAdmin: [],
      notifStaff: [],
      showRepass: false,
      dropdownOpen: false,
      title: ""
    };
  }

  showHandler = () => {
    this.setState({ showRepass: true });
  };

  closeHandler = () => {
    this.setState({ showRepass: false });
  };
  componentDidMount() {
    if (this.state.userdata.m_role_id === "RO0001") {
      this.setState({
        title: "Transaction Promotion need to Approved !"
      });
      this.props.getNotifAdmin();
    } else if (this.state.userdata.m_role_id === "RO0002") {
      this.setState({
        title: "Transaction Promotion need to Close Request !"
      });
      this.props.getNotifStaff(this.state.userdata.m_employee_id);
    } else {
      this.setState({
        title: "Doesnt have a notification"
      });
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      notifAdmin: newProps.ambil.Notif_Admin,
      notifStaff: newProps.ambil.Notif_Staff
    });
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  link = (menu, flag, code, design) => {
    if (flag == 1) {
      return menu + flag + "/" + code + "/" + design;
    } else {
      return menu + flag + "/" + code + "/0";
    }
  };

  render() {
    // alert(JSON.stringify(this.state.notif));
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <br />
            <Paper>
              <ul class="breadcrumb">
                <li class="active">Home</li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <h4>Hello Welcome, {this.state.userdata.username}</h4>
            <p>
              your ID role {this.state.userdata.m_role_id} dengan employee ID{" "}
              {this.state.userdata.m_employee_id}
            </p>
            <Button color="primary" onClick={this.showHandler}>
              change password
            </Button>
            <Repass
              show={this.state.showRepass}
              closeHandler={this.closeHandler}
              username={this.state.userdata.username}
            />
          </Grid>
        </Grid>
        <br />
        {this.state.userdata.m_role_id === "RO0001" ? (
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret color="primary" outline>
              Notification{" "}
              <Badge color="secondary">{this.state.notifAdmin.length}</Badge>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>{this.state.title}</DropdownItem>
              <DropdownItem divider />
              {this.state.notifAdmin.map((row, index) => {
                return (
                  <DropdownItem
                    href={this.link(
                      "/approvepromotion/",
                      row.flag_design,
                      row.code,
                      row.t_design_id
                    )}
                  >
                    Code {row.code} with tittle {row.title}
                  </DropdownItem>
                );
              })}
              <DropdownItem divider />
            </DropdownMenu>
          </ButtonDropdown>
        ) : (
          ""
        )}
        {this.state.userdata.m_role_id === "RO0002" ? (
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret color="primary" outline>
              Notification{" "}
              <Badge color="secondary">{this.state.notifStaff.length}</Badge>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>{this.state.title}</DropdownItem>
              <DropdownItem divider />
              {this.state.notifStaff.map((row, index) => {
                return (
                  <DropdownItem
                    href={this.link(
                      "/closepromotion/",
                      row.flag_design,
                      row.code,
                      row.t_design_id
                    )}
                  >
                    Code {row.code} with tittle {row.title}
                  </DropdownItem>
                );
              })}
              <DropdownItem divider />
            </DropdownMenu>
          </ButtonDropdown>
        ) : (
          ""
        )}
      </div>
    );
  }
}

Home.propTypes = {
  getNotifAdmin: PropTypes.func.isRequired,
  getNotifStaff: PropTypes.func.isRequired,
  ambil: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ambil: state.login
});

export default connect(
  mapStateToProps,
  { getNotifAdmin, getNotifStaff }
)(Home);
