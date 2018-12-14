import React, { Component } from "react";
// import API from "../../../helpers/API";
import apiconfig from "../../../config/api.config.json";
// import axios from "axios";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
// import $ from "jquery";
import { getCompanies } from "../../../actions/companyAction"
import { connect } from 'react-redux'

import EditCompany from "./editCompany";
import CreateCompany from "./Createcompany";
import DeleteCompany from "./deleteCompany";
import ViewCompany from "./viewCompany";

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
import Hidden from "@material-ui/core/Hidden";
import Input from "@material-ui/core/Input";
// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
// import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import moment from 'moment'

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

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    hidden: true
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class ListCompany extends React.Component {
  componentDidMount() {
    this.props.getCompanies()
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      result: newProps.companyReducer.companies,
      result1: newProps.companyReducer.companies
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      formSearch: {
        code: /(?:)/,
        name: /(?:)/,
        created_date: /(?:)/,
        created_by: /(?:)/
      },
      search: "",
      result: [],
      result1: [],
      page: 0,
      rowsPerPage: 5,
      currentCompany: {},
      showCreateCompany: false,
      alertData: {
        status: 0,
        message: "",
        code: ""
      },
    };
    this.showHandler = this.showHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.deleteModalHandler = this.deleteModalHandler.bind(this);
    this.viewModalHandler = this.viewModalHandler.bind(this);
    this.modalStatus = this.modalStatus.bind(this)
  }

  showHandler() {
    this.setState({ showCreateCompany: true });
  }

  closeHandler() {
    this.setState({ showCreateCompany: false });
  }

  closeModalHandler() {
    this.setState({
      viewCompany: false,
      editCompany: false,
      deleteCompany: false
    })
  }

  viewModalHandler(companyid) {
    let tmp = {}
    this.state.result1.map((ele) => {
      if (companyid == ele._id) {
        tmp = ele
      }
    })
    this.setState({
      currentCompany: tmp,
      viewCompany: true
    })
  }

  deleteModalHandler(companyid) {
    let tmp = {}
    this.state.result1.map((ele) => {
      if (companyid == ele._id) {
        tmp = ele
      }
    })
    this.setState({
      currentCompany: tmp,
      deleteCompany: true
    })
    //alert(JSON.stringify(this.state.currentCompany))
  }

  editModalHandler(companyid) {
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    let tmp = {};
    this.state.result.map(ele => {
      if (companyid == ele._id) {
        tmp = {
          _id: ele._id,
          code: ele.code,
          name: ele.name,
          phone: ele.phone,
          email: ele.email,
          address: ele.address,
          province: ele.province,
          city: ele.city,
          updated_by: userdata.username
        };
        this.setState({
          currentCompany: tmp,
          editCompany: true
        });
      }
    });
  }

  changeHandler(e) {
    let test = [];
    let search = e.target.value;
    let patt = new RegExp(search.toLowerCase());

    this.state.result.map(ele => {
      if (
        patt.test(ele.code.toLowerCase()) ||
        patt.test(ele.name.toLowerCase()) ||
        patt.test(ele.created_by.toLowerCase()) ||
        patt.test(ele.created_date.toLowerCase())
      ) {
        test.push(ele);
      }
    });
    this.setState({
      result1: test
    });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  modalStatus(status, message, code) {
    this.setState({
      alertData: {
        status: status,
        message: message,
        code: code
      },
      viewCompany: false,
      editCompany: false,
      deleteCompany: false
    })
    this.props.getCompanies();
    setTimeout(() => {
      window.location.href = "/company"
    }, 2500);
  };

  changeDateFormat = (tanggal) => {
    return moment(tanggal).format("DD/MM/YYYY")
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
      code,
      name,
      created_date,
      created_by
    } = this.state.formSearch;
    let temp = [];
    this.state.result.map(ele => {
      if (
        code.test(ele.code.toLowerCase()) &&
        name.test(ele.name.toLowerCase()) &&
        created_date.test(ele.created_date.toLowerCase()) &&
        created_by.test(ele.created_by.toLowerCase())
      ) {
        temp.push(ele);
      }
      return temp;
    });
    this.setState({
      result1: temp
    });
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper>
            <ul class="breadcrumb">
              <li>
                <a href="/dashboard">Home</a> <span class="divider">/</span>
              </li>
              <li>
                <a href="#">Master</a> <span class="divider">/</span>
              </li>
              <li class="active">List Company</li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <h4>List Company</h4>
          {this.state.alertData.status == 1 ? (
            <Alert color="success">
              <b>Data {this.state.alertData.message} ! </b> Company with
                  name <strong>{this.state.alertData.code} </strong>
              has been {this.state.alertData.message} !
                </Alert>
          ) : (
              console.log("")
            )}
          {this.state.alertData.status == 2 ? (
            <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
              console.log("")
            )}
          <CreateCompany
            create={this.state.showCreateCompany}
            closeHandler={this.closeHandler}
            modalStatus={this.modalStatus}
            getlist={this.props.getCompanies}
            allCompany={this.state.result} />
          <ViewCompany
            view={this.state.viewCompany}
            closeModalHandler={this.closeModalHandler}
            company={this.state.currentCompany}
          />
          <DeleteCompany
            delete={this.state.deleteCompany}
            company_del={this.state.currentCompany}
            closeModalHandler={this.closeModalHandler}
            modalStatus={this.modalStatus}
            getlist={this.props.getCompanies}
          />
          <EditCompany
            edit={this.state.editCompany}
            closeModalHandler={this.closeModalHandler}
            companytest={this.state.currentCompany}
            modalStatus={this.modalStatus}
            getlist={this.props.getCompanies}
            allCompany={this.state.result}
          />
        </Grid>
        <Grid item xs={2} justify="flex-end">
          <Input
            placeholder="Search by Code"
            name="code"
            onChange={this.changeHandler}
          />
        </Grid>
        <Grid item xs={2}>
          <Input
            placeholder="Search by Name"
            name="name"
            onChange={this.changeHandler}
          />
        </Grid>
        <Grid item xs={2}>
          <Input
            placeholder="Search by Date"
            type="date"
            name="created_date"
            onChange={this.changeHandler}
          />
        </Grid>
        <Grid item xs={2}>
          <Input
            placeholder="Search by Create by"
            name="created_by"
            onChange={this.changeHandler}
          />
        </Grid>
        {/* <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={this.change}
            >
              Search
            </Button>
          </Grid> */}
        <Button
          variant="contained"
          color="primary"
          size="small"
          // className={classes.button}
          onClick={this.showHandler}
        >
          Add Company
            </Button>
        <Grid item xs={12}>
          <Hidden>
            <Paper>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Company Code</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.result1.slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                  ).map((company, index) => {
                    return (
                      <TableRow key={company._id}>
                        <TableCell>{index + 1 + this.state.page * this.state.rowsPerPage}</TableCell>
                        <TableCell component="th" scope="row">
                          {company.code}
                        </TableCell>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{this.changeDateFormat(company.created_date)}</TableCell>
                        <TableCell>{company.created_by}</TableCell>
                        <TableCell>
                          <Link to="#">
                            <SearchIcon
                              onClick={() => {
                                this.viewModalHandler(company._id);
                              }}
                            />
                          </Link>
                          <Link to="#">
                            <CreateOutlinedIcon
                              onClick={() => {
                                this.editModalHandler(company._id);
                              }}
                            />
                          </Link>
                          <Link to="#">
                            <DeleteOutlinedIcon
                              onClick={() => {
                                this.deleteModalHandler(company._id);
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
                      colSpan={3}
                      count={this.state.result1.length}
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
          </Hidden>
        </Grid>
      </Grid>
    );
  }
}

ListCompany.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  companyReducer: state.companyIndexReducer
})

export default connect(
  mapStateToProps,
  { getCompanies }
)(ListCompany);
