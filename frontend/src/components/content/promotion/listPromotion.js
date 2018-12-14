import React from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import { getAllPromotion } from "../../../actions/promotionActions";
import { connect } from "react-redux";
import apiconfig from "../../../config/api.config.json";
// import EditPromotion from "./editPromotion";
import CreatePromotion from "./createPromotion";
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
import Gavel from "@material-ui/icons/Gavel";
import Assignment from "@material-ui/icons/Assignment";
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

class ListPromotion extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      formSearch: {
        code: /(?:)/,
        request_by: /(?:)/,
        request_date: /(?:)/,
        name_assign: /(?:)/,
        status: /(?:)/,
        created_date: /(?:)/,
        created_by: /(?:)/
      },
      profil: {
        role: userdata.role_id,
        employee: userdata.employee_id
      },
      iconState: {
        addPromotion: false,
        approve: false,
        closeRequest: false,
        update: false
      },
      showCreatePromotion: false,
      allPromotion: [],
      currentPromotion: {},
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
    this.changeHandler = this.changeHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

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

  changeNull = data => {
    if (data == null) {
      return data;
    } else {
      return data.toLowerCase();
    }
  };

  change = () => {
    const {
      code,
      request_by,
      request_date,
      name_assign,
      status,
      created_date,
      created_by
    } = this.state.formSearch;
    let temp = [];
    this.state.allPromotion.map(ele => {
      if (
        code.test(ele.code.toLowerCase()) &&
        request_by.test(ele.request_by.toLowerCase()) &&
        request_date.test(ele.request_date.toLowerCase()) &&
        name_assign.test(this.changeNull(ele.name_assign)) &&
        status.test(ele.status.toLowerCase()) &&
        created_date.test(ele.created_date.toLowerCase()) &&
        created_by.test(ele.created_by.toLowerCase())
      ) {
        temp.push(ele);
      }
      return temp;
    });
    this.setState({
      hasil: temp
    });
  };

  showHandler() {
    this.setState({ showCreatePromotion: true });
  }

  closeHandler() {
    this.setState({ showCreatePromotion: false });
  }

  componentDidMount() {
    this.props.getAllPromotion();
    this.iconState();
  }

  changeDateFormat = tanggal => {
    return moment(tanggal).format("DD/MM/YYYY");
  };

  iconState = () => {
    let role = this.state.profil.role;
    if (role == "RO0001") {
      this.setState({
        iconState: {
          addPromotion: false,
          approve: true,
          closeRequest: false,
          update: false
        }
      });
    } else if (role == "RO0002") {
      this.setState({
        iconState: {
          addPromotion: true,
          approve: false,
          closeRequest: true,
          update: false
        }
      });
    } else {
      this.setState({
        iconState: {
          addPromotion: true,
          approve: false,
          closeRequest: false,
          update: true
        }
      });
    }
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      allPromotion: newProps.ambil.promotion,
      hasil: newProps.ambil.promotion
    });
  }

  link = (menu, flag, code, design) => {
    if (flag == 1) {
      return menu + flag + "/" + code + "/" + design;
    } else {
      return menu + flag + "/" + code + "/0";
    }
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
                <a href="/dashboard">Transaction</a>{" "}
                <span className="divider">/</span>
              </li>
              <li className="active">List Marketing Promotion</li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <h4>List Marketing Promotion</h4>
          </Grid>
          <Grid item xs={2}>
            <Input
              placeholder="Transaction Code"
              name="code"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Input
              placeholder="Request By"
              name="request_by"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Input
              placeholder="Request Date"
              name="request_date"
              type="date"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={1}>
            <Input
              placeholder="Assign to"
              name="name_assign"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={1}>
            <Input
              placeholder="Status"
              type="text"
              name="status"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Input
              placeholder="Created Date"
              type="date"
              name="created_date"
              onChange={this.changeHandler}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Input
              placeholder="Created By"
              type="text"
              name="created_by"
              onChange={this.changeHandler}
            />
          </Grid>
          {this.state.iconState.addPromotion === true ? (
            <Grid item xs={1}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={this.showHandler}
              >
                Add Promotion
              </Button>
            </Grid>
          ) : (
            ""
          )}
          <CreatePromotion
            create={this.state.showCreatePromotion}
            closeHandler={this.closeHandler}
            modalStatus={this.modalStatus}
          />
          <Grid item xs={12}>
            <br />
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction Code</TableCell>
                    <TableCell>Request By</TableCell>
                    <TableCell>Request Date</TableCell>
                    <TableCell>Assign to</TableCell>
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
                        <TableRow key={row._id}>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>{row.request_by}</TableCell>
                          <TableCell>
                            {this.changeDateFormat(row.request_date)}
                          </TableCell>
                          <TableCell>{row.name_assign}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>
                            {this.changeDateFormat(row.created_date)}
                          </TableCell>
                          <TableCell>{row.created_by}</TableCell>
                          <TableCell>
                            {this.state.iconState.approve == true &&
                            row.status == "Submited" ? (
                              <Link
                                to={this.link(
                                  "/approvepromotion/",
                                  row.flag_design,
                                  row.code,
                                  row.t_design_id
                                )}
                              >
                                <Gavel />
                              </Link>
                            ) : (
                              ""
                            )}
                            {this.state.iconState.closeRequest == true &&
                            row.status == "In Progress" &&
                            row.assign_to == this.state.profil.employee ? (
                              <Link
                                to={this.link(
                                  "/closepromotion/",
                                  row.flag_design,
                                  row.code,
                                  row.t_design_id
                                )}
                              >
                                <Assignment />
                              </Link>
                            ) : (
                              ""
                            )}
                            {this.state.iconState.update == true &&
                            row.status == "Submited" ? (
                              <Link to="#">
                                <CreateOutlinedIcon />
                              </Link>
                            ) : (
                              ""
                            )}
                            <Link
                              to={this.link(
                                "/viewpromotion/",
                                row.flag_design,
                                row.code,
                                row.t_design_id
                              )}
                            >
                              <SearchIcon />
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
          </Grid>
        </Grid>
        <br />
        {this.state.alertData.status === 1 ? (
          <Alert color="success">
            <b>Data {this.state.alertData.message}</b> Data promotion with
            referential promotionname{" "}
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
      </div>
    );
  }
}

ListPromotion.propTypes = {
  getAllPromotion: PropTypes.func.isRequired,
  ambil: PropTypes.object.isRequired
  // classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ambil: state.promot
});

export default connect(
  mapStateToProps,
  { getAllPromotion }
)(ListPromotion);
