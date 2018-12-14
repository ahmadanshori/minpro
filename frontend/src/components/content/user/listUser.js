import React from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import { getAllUser } from "../../../actions/userActions";
import { connect } from "react-redux";
import EditUser from "./editUser";
import CreateUser from "./createUser";
import DeleteUser from "./deleteUser";
import ViewUser from "./viewUser";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

class ListUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formSearch: {
        name: /(?:)/,
        role_name: /(?:)/,
        company_name: /(?:)/,
        username: /(?:)/,
        created_date: /(?:)/
      },
      showCreateUser: false,
      allUser: [],
      currentUser: {},
      alertData: {
        status: 0,
        message: "",
        code: ""
      },
      hasil: [],
      page: 0,
      rowsPerPage: 5
    };
    this.showHandler = this.showHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.viewModalHandler = this.viewModalHandler.bind(this);
    this.editModalHandler = this.editModalHandler.bind(this);
    this.modalStatus = this.modalStatus.bind(this);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  deleteModalHandler(userid) {
    let tmp = {};
    this.state.allUser.map(ele => {
      if (userid === ele._id) {
        tmp = ele;
      }
      return tmp;
    });
    this.setState({
      currentUser: tmp,
      deleteUser: true
    });
  }

  viewModalHandler(userid) {
    let tmp = {};
    this.state.allUser.map(ele => {
      if (userid === ele._id) {
        tmp = ele;
      }
      return tmp;
    });
    this.setState({
      currentUser: tmp,
      viewUser: true
    });
  }

  editModalHandler(userid) {
    let tmp = {};
    this.state.allUser.map(ele => {
      if (userid === ele._id) {
        tmp = {
          _id: ele._id,
          username: ele.username,
          m_role_id: ele.m_role_id,
          m_employee_id: ele.m_employee_id,
          update_by: ele.update_by
        };
        this.setState({
          currentUser: tmp,
          editUser: true
        });
      }
      return tmp;
    });
  }

  changeHandler = event => {
    let tmp = this.state.formSearch;
    if (event.target.name) {
      tmp[event.target.name] = new RegExp(event.target.value.toLowerCase());
    } else {
      tmp[event.target.name] = event.target.value;
    }
    this.setState({
      formSearch: tmp
    });
    this.change();
  };

  change = () => {
    const {
      name,
      role_name,
      company_name,
      username,
      created_date
    } = this.state.formSearch;
    let temp = [];
    this.state.allUser.map(ele => {
      if (
        name.test(ele.name.toLowerCase()) &&
        role_name.test(ele.role_name.toLowerCase()) &&
        company_name.test(ele.company_name.toLowerCase()) &&
        username.test(ele.username.toLowerCase()) &&
        created_date.test(ele.created_date.toLowerCase())
      ) {
        temp.push(ele);
      }
      return temp;
    });
    this.setState({
      hasil: temp
    });
  };

  closeModalHandler() {
    this.setState({
      viewUser: false,
      editUser: false,
      deleteUser: false
    });
  }

  showHandler() {
    this.setState({ showCreateUser: true });
  }

  closeHandler() {
    this.setState({ showCreateUser: false });
  }

  componentDidMount() {
    this.props.getAllUser();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      allUser: newProps.bujang.useran,
      hasil: newProps.bujang.useran
    });
  }

  modalStatus(status, message, code) {
    this.setState({
      alertData: {
        status: status,
        message: message,
        code: code
      },
      viewUser: false,
      editUser: false,
      deleteUser: false
    });
    setTimeout(() => {
      window.location.href = "/user";
    }, 3000);
  }

  changeDateFormat = tanggal => {
    return moment(tanggal).format("DD/MM/YYYY");
  };

  render() {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <br />
            <ul className="breadcrumb">
              <li>
                <a href="/dashboard">Home</a> <span className="divider">/</span>
              </li>
              <li>
                <a href="/dashboard">Master</a>{" "}
                <span className="divider">/</span>
              </li>
              <li className="active">List User</li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <h4>List User</h4>
          </Grid>
          <Grid item xs={2}>
            <Input
              placeholder="Employee Name"
              name="name"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={2}>
            <Input
              placeholder="Role Name"
              name="role_name"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={2}>
            <Input
              placeholder="Company Name"
              name="company_name"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={2}>
            <Input
              placeholder="Username"
              name="username"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={2}>
            <Input
              placeholder="Created Date"
              type="date"
              name="created_date"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={this.showHandler}
            >
              Add User
            </Button>
          </Grid>
          <Grid item xs={6} />
          <ViewUser
            view={this.state.viewUser}
            closeModalHandler={this.closeModalHandler}
            user={this.state.currentUser}
          />
          <DeleteUser
            delete={this.state.deleteUser}
            user={this.state.currentUser}
            closeModalHandler={this.closeModalHandler}
            modalStatus={this.modalStatus}
          />
          <CreateUser
            create={this.state.showCreateUser}
            closeHandler={this.closeHandler}
            modalStatus={this.modalStatus}
            allUser={this.state.allUser}
          />
          <EditUser
            edit={this.state.editUser}
            closeModalHandler={this.closeModalHandler}
            currentUser={this.state.currentUser}
            username={this.state.currentUser.username}
            modalStatus={this.modalStatus}
            allUser={this.state.allUser}
          />
          <Grid item xs={12}>
            <br />
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.hasil
                    .slice(
                      this.state.page * this.state.rowsPerPage,
                      this.state.page * this.state.rowsPerPage +
                        this.state.rowsPerPage
                    )
                    .map((row, index) => {
                      return (
                        <TableRow key={row._id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.role_name}</TableCell>
                          <TableCell>{row.company_name}</TableCell>
                          <TableCell>{row.username}</TableCell>
                          <TableCell>
                            {this.changeDateFormat(row.created_date)}
                          </TableCell>
                          <TableCell>{row.created_by}</TableCell>
                          <TableCell>
                            <Link to="#">
                              <SearchIcon
                                onClick={() => {
                                  this.viewModalHandler(row._id);
                                }}
                              />
                            </Link>
                            <Link to="#">
                              <CreateOutlinedIcon
                                onClick={() => {
                                  this.editModalHandler(row._id);
                                }}
                              />
                            </Link>
                            <Link to="#">
                              <DeleteOutlinedIcon
                                onClick={() => {
                                  this.deleteModalHandler(row._id);
                                }}
                              />
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={4}
                      count={this.state.hasil.length}
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
            <br />
            {this.state.alertData.status === 1 ? (
              <Alert color="success">
                <b>Data {this.state.alertData.message}</b> Data user with
                referential username{" "}
                <strong>{this.state.alertData.code} </strong>
                has been {this.state.alertData.message}
              </Alert>
            ) : (
              ""
            )}
            {this.state.alertData.status === 2 ? (
              <Alert color="danger">{this.state.alertData.message} </Alert>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

ListUser.propTypes = {
  getAllUser: PropTypes.func.isRequired,
  bujang: PropTypes.object.isRequired
  // classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bujang: state.useray
});

export default connect(
  mapStateToProps,
  { getAllUser }
)(ListUser);
