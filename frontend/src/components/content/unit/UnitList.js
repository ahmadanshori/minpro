import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUnits } from "../../../actions/unitAction";
// import { getStaff,getEmployee } from "../../../actions/designAction"
import { Search, CreateOutlined } from "@material-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Spinner from "../common/Spinner";
// import UnitView from './UnitView'
import EditUnit from './UnitEdit'
// import UnitDelete from './UnitDelete'
// import UnitAdd from './UnitAdd'
import { Alert, FormGroup, Input, Form, Button } from "reactstrap";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

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
import SearchIcon from "@material-ui/icons/Search";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

const unitdata = JSON.parse(localStorage.getItem('B176_USERDATA_KEY'))
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

class ListUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formSearch: {
        code: /(?:)/,
        name: /(?:)/,
        created_date: /(?:)/,
        created_by: /(?:)/,
      },
      showCreateUnit: false,
      allUnit: [],
      currentUnit: {},
      alertData: {
        status: 0,
        message: "",
        code: ""
      },
      hasil: [],
      page: 0,
      rowsPerPage: 5
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  deleteModalHandler=(unitid)=> {
    let tmp = {};
    this.state.allUnit.map(ele => {
      if (unitid === ele._id) {
        tmp = ele;
      }
      return tmp;
    });
    this.setState({
      currentUnit: tmp,
      deleteUnit: true
    });
  }

  viewModalHandler=(unitid)=>{
    let tmp = {};
    this.state.allUnit.map(ele => {
      if (unitid === ele._id) {
        tmp = ele;
      }
      return tmp;
    });
    this.setState({
      currentUnit: tmp,
      viewUnit: true
    });
    
  }

  editModalHandler=(unitid)=> {
    let tmp = {};
    this.state.allUnit.map(ele => {
      if (unitid === ele._id) {
        tmp = {
          _id: ele._id,
          code: ele.code,
          name:ele.name,
          description: ele.description,
          created_by: ele.created_by,
          created_date: ele.created_date,
          update_by: ele.update_by,
          update_date: ele.update_date,
        };
        this.setState({
          currentUnit: tmp,
          editUnit: true
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
      code,
      name,
      created_by,
      created_date
    } = this.state.formSearch;
    let temp = [];
    this.state.allUnit.map(ele => {
      if (
        code.test(ele.code.toLowerCase()) &&
        name.test(ele.name.toLowerCase()) &&
        created_by.test(ele.created_by.toLowerCase()) &&
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

  closeModalHandler=()=>{
    this.setState({
      viewUnit: false,
      editUnit: false,
      deleteUnit: false
    });
  }

  showHandler=()=>{
    this.setState({ showCreateUnit: true });
  }

  closeHandler=()=>{
    this.setState({ showCreateUnit: false });
  }

  componentDidMount() {
    this.props.getUnits();
    // this.props.getStaff();
    // this.props.getEmployee()
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      allUnit: newProps.units.unitData,
      hasil: newProps.units.unitData
    });
  }

  modalStatus=(status, message, code)=> {
    this.setState({
      alertData: {
        status: status,
        message: message,
        code: code
      },
      viewUnit: false,
      editUnit: false,
      deleteUnit: false
    });
    setTimeout(() => {
      window.location.href = "/unit";
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
              <li className="active">List Unit</li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <h4>List Unit</h4>
          </Grid>
          <Grid item xs={2}>
            <Input
              placeholder="Unit Code"
              name="code"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              placeholder="Unit Name"
              name="name"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={2}>
            <Input
              placeholder="Created By"
              name="created_by"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              placeholder="Created Date"
              type="date"
              name="created_date"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={this.showHandler}
            >
              Add Unit
            </Button>
          </Grid>
          <Grid item xs={6} />
          {/* <ViewUnit
            view={this.state.viewUnit}
            closeModalHandler={this.closeModalHandler}
            unit={this.state.currentUnit}
          />
          <DeleteUnit
            delete={this.state.deleteUnit}
            unit={this.state.currentUnit}
            closeModalHandler={this.closeModalHandler}
            modalStatus={this.modalStatus}
          />
          <CreateUnit
            create={this.state.showCreateUnit}    
            closeHandler={this.closeHandler}
            modalStatus={this.modalStatus}
            allUnit={this.state.allUnit}
          />*/}
          <EditUnit
            edit={this.state.editUnit}
            closeModalHandler={this.closeModalHandler}
            currentUnit={this.state.currentUnit}
            modalStatus={this.modalStatus}
            allUnit={this.state.allUnit}
          /> 
          <Grid item xs={12}>
            <br />
            <Paper>
              <div className='table-responsive'>
              <Table className='table table-stripped'>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Unit Code</TableCell>
                    <TableCell>Unit Name</TableCell>
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
                         <TableCell>{index+1}</TableCell>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.created_date}</TableCell>
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
              </div>
            </Paper>
            <br />
            {this.state.alertData.status === 1 ? (
              <Alert color="success">
                <b>Data {this.state.alertData.message}</b> Data unit with
                referential unitname{" "}
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

ListUnit.propTypes = {
  getUnits: PropTypes.func.isRequired,
  // getStaff: PropTypes.func.isRequired,
  // getEmployee: PropTypes.func.isRequired,
  
  units: PropTypes.object.isRequired
  // classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  units: state.units
});

export default connect(
  mapStateToProps,
  { getUnits}
)(ListUnit);
