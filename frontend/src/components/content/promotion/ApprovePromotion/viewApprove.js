import React from "react";
import { getStaff } from "../../../../actions/userActions";
import {
  getPromotion,
  getDesignOne,
  getAllPromotion
} from "../../../../actions/promotionActions";
import { getItem } from "../../../../actions/promotionItemActions";
import { getFile } from "../../../../actions/promotionFileActions";
import { connect } from "react-redux";
import { Alert } from "reactstrap";

import ApprovePromotion from "./modalApprove";
import RejectPromotion from "./modalReject";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import GetApp from "@material-ui/icons/GetApp";

class viewApprove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: null,
      assignto: "",
      ApprovePromotion: false,
      RejectPromotion: false,
      alertData: {
        //untuk validasi
        status: false,
        message: ""
      },
      alertStatus: {
        //untuk alert
        status: 0,
        message: ""
      },
      AllPromotion: [],
      Promotion: [],
      Design: [],
      Item: [],
      File: [],
      Staff: []
    };
  }

  closeModalHandler = () => {
    this.setState({
      ApprovePromotion: false,
      RejectPromotion: false
    });
  };

  validateFilter(assign) {
    let AllPromotion = this.state.AllPromotion.map(ele => ele.assign_to);
    let a = AllPromotion.filter(e => e === assign);
    if (a.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  showApprove = () => {
    if (
      this.state.Promotion.assign_to == null ||
      this.state.Promotion.note == null
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "Please insert assign to and note !"
        }
      });
    } else if (this.validateFilter(this.state.Promotion.assign_to) === true) {
      this.setState({
        alertData: {
          status: true,
          message: "Assign have a close request"
        }
      });
    } else {
      this.setState({ ApprovePromotion: true });
    }
  };

  showReject = () => {
    if (this.state.Promotion.assign_to !== null) {
      this.setState({
        alertData: {
          status: true,
          message: "Assign must be empty for reject!"
        }
      });
    } else {
      this.setState({ RejectPromotion: true });
    }
  };

  selectStaff = selectedOption => {
    let tmp = this.state.Promotion;
    tmp["assign_to"] = selectedOption.target.value;
    this.setState({
      Promotion: tmp,
      alertData: {
        status: false,
        message: ""
      }
    });
  };
  changeNote = e => {
    let tmp = this.state.Promotion;
    tmp["note"] = e.target.value;
    this.setState({
      Promotion: tmp,
      alertData: {
        status: false,
        message: ""
      }
    });
  };

  forStatus(status) {
    if (status == 0) return "Reject";
    if (status == 1) return "Submited";
    if (status == 2) return "In Progress";
    if (status == 3) return "Done";
  }
  forTodo(todo) {
    if (todo == 1) return "Print";
    if (todo == 2) return "Post to Social Media";
    if (todo == 3) return "Post to Company Profile Website";
    if (todo == 4) return "Other";
  }
  componentDidMount() {
    let code = this.props.match.params.code;
    let design = this.props.match.params.design;
    let flag = parseInt(this.props.match.params.flag);
    if (flag === 1) {
      this.props.getPromotion(code);
      this.props.getDesignOne(design);
      this.props.getItem(code);
      this.props.getFile(code);
    } else {
      this.props.getPromotion(code);
      this.props.getFile(code);
    }
    this.props.getAllPromotion();
    this.props.getStaff();
    this.setState({
      flag: flag
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      Promotion: newProps.ambil.one,
      Design: newProps.ambil.designOne,
      Item: newProps.ambil.item,
      File: newProps.ambil.file,
      Staff: newProps.ambil1.staff,
      AllPromotion: newProps.ambil.promotion
    });
  }

  modalStatus = (status, message) => {
    this.setState({
      alertStatus: {
        status: status,
        message: message
      }
    });
  };
  linkdownload = (name, extention) => {
    let path = "/uploads/";
    return path + name + extention;
  };
  render() {
    return (
      <div class="container-fluid">
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
              <li>
                <a href="/promotion">List Marketing Promotion</a>{" "}
                <span className="divider">/</span>
              </li>
              <li className="active">View Marketing Promotion</li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <h4>View Marketing Promotion</h4>
          </Grid>
        </Grid>
        <ApprovePromotion
          promotion={this.state.Promotion}
          closeModalHandler={this.closeModalHandler}
          show={this.state.ApprovePromotion}
          modalStatus={this.modalStatus}
        />
        <RejectPromotion
          promotion={this.state.Promotion}
          closeModalHandler={this.closeModalHandler}
          show={this.state.RejectPromotion}
          modalStatus={this.modalStatus}
        />
        <form>
          <div class="card mb-3">
            <div class="card-body">
              <h6 class="card-title">MARKETING HEADER PROMOTION</h6>
              <hr />
              <div class="form-row">
                <div class="form-group col-md-6 row">
                  <label
                    for="transactioncode"
                    class="col-4 col-form-label text-right"
                  >
                    * Transaction Code
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      id="transactioncode"
                      value={this.state.Promotion.code}
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group col-md-6 row">
                  <label
                    for="requestby"
                    class="col-4 col-form-label text-right"
                  >
                    * Request By
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      id="requestby"
                      value={this.state.Promotion.request_by}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6 row">
                  <label
                    for="eventcode"
                    class="col-4 col-form-label text-right"
                  >
                    * Event Code
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      id="requestby"
                      value={this.state.Promotion.t_event_id}
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group col-md-6 row">
                  <label
                    for="requestdate"
                    class="col-4 col-form-label text-right"
                  >
                    * Request Date
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      id="requestdate"
                      value={this.state.Promotion.request_date}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6 row">
                  <label
                    for="titleheader"
                    class="col-4 col-form-label text-right"
                  >
                    * Title Header
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      id="titleheader"
                      value={this.state.Promotion.title}
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group col-md-6 row">
                  <label for="status" class="col-4 col-form-label text-right">
                    Status
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      id="status"
                      value={this.forStatus(this.state.Promotion.status)}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6 row">
                  <label for="assignto" class="col-4 col-form-label text-right">
                    * Assign To
                  </label>
                  <div class="col-8">
                    <select
                      name="staff"
                      id="staff"
                      class="form-control"
                      onChange={this.selectStaff}
                    >
                      <option hidden>Select Staff you want assign..</option>
                      {this.state.Staff.map(row => {
                        return (
                          <option value={row.m_employee_id} name={row.name}>
                            {row.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div class="form-group col-md-6 row">
                  <label for="note" class="col-4 col-form-label text-right">
                    * Note
                  </label>
                  <div class="col-8">
                    <textarea
                      class="form-control"
                      aria-label="With textarea"
                      value={this.state.Promotion.note}
                      onChange={this.changeNote}
                    />
                  </div>
                </div>
              </div>
              {this.state.alertData.status === true ? (
                <Alert color="danger">{this.state.alertData.message} </Alert>
              ) : (
                ""
              )}
            </div>
          </div>
          {this.state.flag === 1 ? (
            <div class="card mb-3">
              <div class="card-body">
                <h6 class="card-title">DESIGN HEADER INFORMATION</h6>
                <hr />
                <div class="form-row">
                  <div class="form-group col-md-6 row">
                    <label
                      for="designcode"
                      class="col-4 col-form-label text-right"
                    >
                      * Design Code
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        class="form-control"
                        id="designcode"
                        value={this.state.Design.code}
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-group col-md-6 row">
                    <label
                      for="requestby"
                      class="col-4 col-form-label text-right"
                    >
                      * Request By
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        class="form-control"
                        id="requestby"
                        value={this.state.Design.request_by}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6 row">
                    <label
                      for="titleheader"
                      class="col-4 col-form-label text-right"
                    >
                      * Title Header
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        class="form-control"
                        id="titleheader"
                        value={this.state.Design.title_header}
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-group col-md-6 row">
                    <label
                      for="requestdate"
                      class="col-4 col-form-label text-right"
                    >
                      * Request Date
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        class="form-control"
                        id="requestdate"
                        value={this.state.Design.request_date}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6 row">
                    <label for="note" class="col-4 col-form-label text-right">
                      * Note
                    </label>
                    <div class="col-8">
                      <textarea
                        class="form-control"
                        aria-label="With textarea"
                        value={this.state.Design.note}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {this.state.flag === 1 ? (
            <div class="card mb-3">
              <div class="card-body">
                <h6 class="card-title">DESIGN ITEM INFORMATION</h6>
                <hr />
                <div class="table-responsive">
                  <table class="table table-borderless table-sm">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Product Descripton</th>
                        <th>Title</th>
                        <th>Qty</th>
                        <th>Todo</th>
                        <th>Due Date</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Note</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Item.map(row => {
                        return (
                          <tr>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                id="productname"
                                value={row.product_name}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                id="productdescription"
                                value={row.description}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                id="title"
                                value={row.title}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                id="qty"
                                value={row.qty}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                id="qty"
                                placeholder={this.forTodo(row.todo)}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                id="duedate"
                                placeholder={row.request_due_date}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                id="startdate"
                                value={row.start_date}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                id="enddate"
                                value={row.end_date}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                id="note"
                                value={row.note}
                                disabled
                              />
                            </td>
                            <td>
                              <a href="/uploads/Ghuroba.PNG" download>
                                <GetApp />
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div class="card mb-3">
            <div class="card-body">
              <h6 class="card-title">UPLOAD FILE</h6>
              <hr />
              <div class="table-responsive">
                <table class="table table-borderless table-sm">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Qty</th>
                      <th>Todo</th>
                      <th>Due Date</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Note</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.File.map(row => {
                      return (
                        <tr>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              id="filename"
                              value={row.filename}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              id="qty"
                              value={row.qty}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              id="todo"
                              placeholder={this.forTodo(row.todo)}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              id="duedate"
                              value={row.request_due_date}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              id="start_date"
                              value={row.start_date}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              id="end_date"
                              value={row.end_date}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              id="note"
                              value={row.note}
                              disabled
                            />
                          </td>
                          <td>
                            <a
                              href={this.linkdownload(
                                row.filename,
                                row.extention
                              )}
                              download
                            >
                              <GetApp />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {this.state.alertStatus.status === 1 ? (
            <Alert color="success">
              <b>Data {this.state.alertStatus.message}</b> Data promotion with
              referential <strong>{this.state.Promotion.code} </strong>
              has been {this.state.alertStatus.message}
            </Alert>
          ) : (
            ""
          )}
          <div class="form-group row">
            <div class="col d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-primary float-right mr-1"
                onClick={this.showApprove}
              >
                Approved
              </button>
              <button
                type="button"
                class="btn btn-danger  float-right ml-1"
                onClick={this.showReject}
              >
                Reject
              </button>
              <a href="/promotion">
                <button type="button" class="btn btn-warning  float-right ml-1">
                  Cancel
                </button>
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

viewApprove.propTypes = {
  ambil: PropTypes.object.isRequired,
  ambil1: PropTypes.object.isRequired,
  getAllPromotion: PropTypes.object.isRequired,
  getPromotion: PropTypes.func.isRequired,
  getDesignOne: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  getFile: PropTypes.func.isRequired,
  getStaff: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ambil: state.promot,
  ambil1: state.useray
});

export default connect(
  mapStateToProps,
  { getPromotion, getDesignOne, getItem, getFile, getStaff, getAllPromotion }
)(viewApprove);
