import React from "react";
import API from "../../../helpers/API"
import axios from "axios";
import apiconfig from '../../../config/api.config.json'
import { Link } from "react-router-dom";
import { Alert, FormGroup, Input, Form, Button } from "reactstrap";
import $ from "jquery";
import { getAllTsouveniritem } from "../../../actions/tsouveniritemAction";
import { connect } from "react-redux";

import EditTsouveniritem from "./editTsouveniritem";
import CreateTsouveniritem from "./CreateTsouveniritem";
// import DeleteTsouveniriEditTsouveniritem from "./deleteTsouveniriEditTsouveniritem";
import ViewTsouveniritem from "./viewTsouveniritem";
import AdminApprove from "./adminApprove";
import RequestReject from "./rejectRequest";
import ReceivedSouvenirRequest from "./ReceivedSouvenirItem";
import SettlementSouvenir from "./SettlementSouvenir";
import ApproveSettlement from "./ApproveSettlement";
import CloseOrder from "./CloseOrder";

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
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Assignment from "@material-ui/icons/Assignment"
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

import Grid from "@material-ui/core/Grid";


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

class ListTsouveniritem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      showCreateTsouveniritem: false,
      currentTsouveniritem: {},
      alertData: {
        status: 0,
        message: "",
        code: ""
      },
      hasil: [],
      result: [],
      page: 0,
      rowsPerPage: 10
    };
    // this.showHandler = this.showHandler.bind(this);
    
  }

  designStatus = (status) => {
    switch (status) {
      case 0:
        return "Rejected";
      case 2:
        return "In Progress";
      case 3:
        return "Recieved by Requester";
      case 4:
        return "Settlement";
      case 5:
        return "Approved Settlement";
      case 6:
        return "Close Request";
      default:
        return "Submitted";
    }
  }

  componentDidMount() {
    this.props.getAllTsouveniritem();
  }

  componentWillReceiveProps(newProps) {
    //alert(newProps.tsouveniritem.ts)
    this.setState({
      result: newProps.tsouveniritem.ts,
      hasil: newProps.tsouveniritem.ts
    });
  }

  showHandler = () => {
    this.setState({ showCreateTsouveniritem: true });
  }

  closeHandler = () => {
    this.setState({ showCreateTsouveniritem: false });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  deleteModalHandler = tsouveniritemid => {
    let tmp = {};
    this.state.result.map(ele => {
      if (tsouveniritemid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentTsouveniritem: tmp,
      deleteTsouvecurrentTsouveniritem: true
    });
  }

  viewModalHandler = tsouveniritemid => {
    let tmp = {};
    this.state.result.map(ele => {
      if (tsouveniritemid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentTsouveniritem: tmp,
      viewTsouveniritem: true
    });
  }

  adminApproveHandler = tsouveniritemid => {
    let tmp = {};
    this.state.result.map(ele => {
      if (tsouveniritemid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentTsouveniritem: tmp,
      adminApprove: true
    });
    //alert(JSON.stringify(this.state.currentTsouveniritem))
  }

  receivedSouvenirHandler = tsouveniritemid => {
    let tmp = {};
    this.state.result.map(ele => {
      if (tsouveniritemid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentTsouveniritem: tmp,
      receivedSouvenir: true
    });
  }
  
  settlementSouvenirHandler = tsouveniritemid => {
    let tmp = {};
    this.state.result.map(ele => {
      if (tsouveniritemid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentTsouveniritem: tmp,
      settlementSouvenir: true
    });
  }

  approveSettlementHandler = tsouveniritemid => {
    let tmp = {};
    this.state.result.map(ele => {
      if (tsouveniritemid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentTsouveniritem: tmp,
      approveSettlement: true
    });
  }

  adminButtonHandler = tsouveniritemid => {
  let tmp = {};
  this.state.result.map(ele => {
    if (tsouveniritemid == ele._id) {
      tmp = ele;
    }
  }) 
  if(tmp.status == 0) {
    alert("Request rejected, can't continue");
  } else if(tmp.status == 1) {
    this.setState({
      currentTsouveniritem: tmp,
      adminApprove: true
    })
  } else if(tmp.status == 2) {
    this.setState({
      currentTsouveniritem: tmp,
      receivedSouvenir: true
    })
  } else if(tmp.status == 3) {
    this.setState({
      currentTsouveniritem: tmp,
      settlementSouvenir: true
    })
  } else if(tmp.status == 4) {
    this.setState({
      currentTsouveniritem: tmp,
      approveSettlement: true
    })
  } else if(tmp.status == 5) {
    this.setState({
      currentTsouveniritem: tmp,
      closeOrderSouvenir: true
    })
  } else {
    alert("Done Request ");
  }
}

  closeOrderSouvenirHandler = tsouveniritemid => {
    let tmp = {};
    this.state.result.map(ele => {
      if (tsouveniritemid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentTsouveniritem: tmp,
      closeOrderSouvenir: true
    });
  }

  editModalHandler = tsouveniritemid => {
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    let date = new Date();
    let tmp = {};
    this.state.result.map(ele => {
      if (tsouveniritemid == ele._id) {
        tmp = {
          _id: ele._id,
          t_event_code: ele.t_event_id,
          code: ele.code,
          request_by: ele.first_name_requester + " " + ele.last_name_requester,
          request_date: ele.request_date,
          request_due_date: ele.request_due_date,
          status: ele.status,
          note: ele.note,
          created_by: ele.created_by,
          created_date: ele.created_date,
          updated_by: userdata.username,
          updated_date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        };
        this.setState({
          currentTsouveniritem: tmp,
          editTsouveniritem: true
        });
      }
    });
  }

  // Search
  changeHandler = e => {
    //alert(JSON.stringify(this.state.result))
    //alert(e.target.value)
    let test = [];
    let search = e.target.value;
    let patt = new RegExp(search.toLowerCase());
    this.state.result.map(ele => {
      if (
        patt.test(ele.code.toLowerCase()) ||
        patt.test(ele.first_name_requester + " " + ele.last_name_requester.toLowerCase()) ||
        patt.test(ele.request_date) ||
        patt.test(ele.request_due_date) ||
        // patt.test(ele.created_by.toLowerCase()) ||
        patt.test(ele.created_date) ||
        patt.test(ele.status)
      ) {
        test.push(ele);
      }
    });
    this.setState({
      hasil: test
    });
  }

  // Close
  closeModalHandler = () => {
    this.setState({
      viewTsouveniritem: false,
      editTsouveniritem: false,
      deleteTsouveniritem: false,
      adminApprove: false,
      rejectRequest: false,
      receivedSouvenir: false,
      approveSettlement: false,
      closeOrderSouvenir: false,
      settlementSouvenir: false
    });
    this.props.getAllTsouveniritem();
  }

  // Status
  modalStatus = (status, message, code) => {
    this.setState({
      alertData: {
        status: status,
        message: message,
        code: code
      },
      viewCompany: false,
      editCompany: false,
      deleteCompany: false
    });
  }

  render() {
    const { classes } = this.props;
    // let button;
    // if(this.designStatus(status) == 1) {
    //   button = <Link to="#">
    //   <CreateOutlinedIcon onClick={() => { this.adminApproveHandler(_id);} } />
    //   </Link>
    // } else if(this.designStatus(status) == 2) {
    //   button = <Link to="#">
    //     <SearchIcon onClick={() => { this.receivedSouvenirHandler(_id);} } />
    //   </Link>
    // } else if(this.designStatus(status) == 3) {
    //   button = <Link to="#">
    //      <CreateOutlinedIcon onClick={() => { this.settlementSouvenirHandler(_id);} }/>
    //   </Link>
    // } else if(this.designStatus(status) == 4) {
    //   button = <Link to="#">
    //     <CreateOutlinedIcon onClick={() => { this.approveSettlementHandler(_id);} } />
    //   </Link>
    // } else if(this.designStatus(status) == 5) {
    //   button = <Link to="#">
    //     <SearchIcon onClick={() => { this.closeOrderSouvenirHandler(_id);} } />
    //     </Link>
    // }

    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    if(userdata.m_role_id == "RO0001") {
      return (
        <div>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Paper>
                <ul class="breadcrumb">
                  <li>
                    <a href="/company">Home</a> <span class="divider">/</span>
                  </li>
                  <li>
                    <a href="#">Master</a> <span class="divider">/</span>
                  </li>
                  <li class="active">List Souvenir Request</li>
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <h4>List Souvenir Request</h4>
            </Grid>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" placeholder="Search" name="search" onChange={this.changeHandler} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="date" placeholder="Date Search" name="date" onChange={this.changeHandler} dateFormat="DD/MM/YYYY"/>
              </FormGroup>
              {/* <Button variant="contained" color="primary" size="small" onClick={this.showHandler}>
                Add Request
              </Button> */}
            </Form>
            <Grid item xs={3} justify="flex-end">
            </Grid>
            <ViewTsouveniritem
              view={this.state.viewTsouveniritem}
              closeModalHandler={this.closeModalHandler}
              tsouveniritem={this.state.currentTsouveniritem}
            />
            <AdminApprove
              approve={this.state.adminApprove}
              closeModalHandler={this.closeModalHandler}
              tsouveniritem={this.state.currentTsouveniritem}
              modalStatus={this.modalStatus}
            />
            <RequestReject
              closeModalHandler={this.closeModalHandler}
              tsouveniritem={this.state.currentTsouveniritem}
              modalStatus={this.modalStatus}
            />
            <ReceivedSouvenirRequest
              approve={this.state.receivedSouvenir}
              closeModalHandler={this.closeModalHandler}
              tsouveniritem={this.state.currentTsouveniritem}
              modalStatus={this.modalStatus}
              getlist={this.props.getAllTsouveniritem}
            />
            <ApproveSettlement
              approve={this.state.approveSettlement}
              closeModalHandler={this.closeModalHandler}
              tsouveniritem={this.state.currentTsouveniritem}
              modalStatus={this.modalStatus}
              getlist={this.props.getAllTsouveniritem}
            />
            <CloseOrder
              approve={this.state.closeOrderSouvenir}
              closeModalHandler={this.closeModalHandler}
              tsouveniritem={this.state.currentTsouveniritem}
              modalStatus={this.modalStatus}
            />
            <CreateTsouveniritem
              create={this.state.showCreateTsouveniritem}
              closeHandler={this.closeHandler}
              modalStatus={this.modalStatus}
            />
            <EditTsouveniritem
              edit={this.state.editTsouveniritem}
              closeModalHandler={this.closeModalHandler}
              tsouveniritemtest={this.state.currentTsouveniritem}
              modalStatus={this.modalStatus}
            />
            <Grid item xs={12}>
              <Hidden>
                <br />
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell >Transaction Code</TableCell>
                        <TableCell>Request By</TableCell>
                        <TableCell >Request Date</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Status</TableCell>
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
                            <TableRow key={row.id}>
                              <TableCell>{index + 1 + this.state.page * this.state.rowsPerPage}</TableCell>
                              <TableCell component="th" scope="row">
                                {row.code}
                              </TableCell>
                              <TableCell>{row.first_name_requester} {row.last_name_requester}</TableCell>
                              <TableCell>{row.request_date}</TableCell>
                              <TableCell>{row.request_due_date}</TableCell>
                              <TableCell>{this.designStatus(row.status)}</TableCell>
                              <TableCell>{row.created_date}</TableCell>
                              <TableCell>{row.first_name_requester} {row.last_name_requester}</TableCell>
                              <TableCell>
                                <Link to="#">
                                  <SearchIcon
                                    onClick={() => {
                                      this.viewModalHandler(row._id);
                                    }}
                                  />
                                </Link>
                                <Link to="#">
                                  <Assignment
                                    onClick={() => {
                                      this.adminButtonHandler(row._id);
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
                          colSpan={5}
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
              </Hidden>
            </Grid>
          </Grid>
          <br />
          <Grid item xs={12}>
            {this.state.alertData.status == 1 ? (
              <Alert color="success">
                <b>{this.state.alertData.message}</b> 
              </Alert>
            ) : (
                ""
              )}
            {this.state.alertData.status == 2 ? (
              <Alert color="danger">{this.state.alertData.message} </Alert>
            ) : (
                ""
              )}
          </Grid>
        </div>
      );
    } else if (userdata.m_role_id == "RO0002") {
      return (
        <div>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Paper>
                <ul class="breadcrumb">
                  <li>
                    <a href="/company">Home</a> <span class="divider">/</span>
                  </li>
                  <li>
                    <a href="#">Master</a> <span class="divider">/</span>
                  </li>
                  <li class="active">List Souvenir Request</li>
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <h4>List Souvenir Request</h4>
            </Grid>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" placeholder="Search" name="search" onChange={this.changeHandler} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="date" placeholder="Date Search" name="date" onChange={this.changeHandler} />
              </FormGroup>
              <Button variant="contained" color="primary" size="small" onClick={this.showHandler}>
                Add Request
              </Button>
            </Form>
            <Grid item xs={3} justify="flex-end">
            </Grid>
            <ViewTsouveniritem
              view={this.state.viewTsouveniritem}
              closeModalHandler={this.closeModalHandler}
              tsouveniritem={this.state.currentTsouveniritem}
            />
            <CreateTsouveniritem
              create={this.state.showCreateTsouveniritem}
              closeHandler={this.closeHandler}
              modalStatus={this.modalStatus}
            />
            <EditTsouveniritem
              edit={this.state.editTsouveniritem}
              closeModalHandler={this.closeModalHandler}
              tsouveniritemtest={this.state.currentTsouveniritem}
              modalStatus={this.modalStatus}
            />
            <SettlementSouvenir
              approve={this.state.settlementSouvenir}
              closeModalHandler={this.closeModalHandler}
              tsouveniritem={this.state.currentTsouveniritem}
              modalStatus={this.modalStatus}
              getlist={this.props.getAllTsouveniritem}
            />
            <Grid item xs={12}>
              <Hidden>
                <br />
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell >Transaction Code</TableCell>
                        <TableCell>Request By</TableCell>
                        <TableCell >Request Date</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Status</TableCell>
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
                            <TableRow key={row.id}>
                              <TableCell>{index + 1 + this.state.page * this.state.rowsPerPage}</TableCell>
                              <TableCell component="th" scope="row">
                                {row.code}
                              </TableCell>
                              <TableCell>{row.first_name_requester} {row.last_name_requester}</TableCell>
                              <TableCell>{row.request_date}</TableCell>
                              <TableCell>{row.request_due_date}</TableCell>
                              <TableCell>{this.designStatus(row.status)}</TableCell>
                              <TableCell>{row.created_date}</TableCell>
                              <TableCell >{row.first_name_requester} {row.last_name_requester}</TableCell>
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
                                  <Assignment
                                    onClick={() => {
                                      this.adminButtonHandler(row._id);
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
                          colSpan={5}
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
              </Hidden>
            </Grid>
          </Grid>
          <br />
          <Grid item xs={12}>
            {this.state.alertData.status == 1 ? (
              <Alert color="success">
                <b>{this.state.alertData.message}</b>
              </Alert>
            ) : (
                ""
              )}
            {this.state.alertData.status == 2 ? (
              <Alert color="danger">{this.state.alertData.message} </Alert>
            ) : (
                ""
              )}
          </Grid>
        </div>
      );
    }
  }
}

ListTsouveniritem.propTypes = {
  getAllTsouveniritem: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tsouveniritem: state.tsouveniritem
});

export default connect(
  mapStateToProps,
  { getAllTsouveniritem }
)(ListTsouveniritem);
