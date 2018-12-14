import React from "react";
import { Link } from "react-router-dom";
import { getPromotion, getDesignOne } from "../../../actions/promotionActions";
import { getItem } from "../../../actions/promotionItemActions";
import { getFile } from "../../../actions/promotionFileActions";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

class viewPromotion extends React.Component {
  constructor(props) {
    super(props);
    // let data = JSON.parse(localStorage.getItem("PROMOTION"));
    this.state = {
      flag: null,
      alertData: {
        status: 0,
        message: "",
        code: ""
      },
      Promotion: [],
      Design: [],
      Item: [],
      File: []
    };
  }

  coba = () => {
    alert(JSON.stringify(this.state.formPromotion));
    localStorage.removeItem("PROMOTION");
  };

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

    this.setState({
      flag: flag
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      Promotion: newProps.ambil.one,
      Design: newProps.ambil.designOne,
      Item: newProps.ambil.item,
      File: newProps.ambil.file
    });
  }

  render() {
    alert(JSON.stringify(this.state.File));
    return (
      <div class="container-fluid">
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <br />
            <a href="/uploads/Ghuroba.PNG" download>
              <button type="button" class="btn btn-warning  float-right ml-1">
                Coba
              </button>
            </a>
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
                      value={this.state.Promotion.status}
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
                    <input
                      type="text"
                      class="form-control"
                      id="assignto"
                      value=""
                    />
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
                    />
                  </div>
                </div>
              </div>
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
                                value={row.title}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                id="productdescription"
                                value="belum" //{row.description}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                id="title"
                                value="belum" //{row.title_item}
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
                                value={row.todo}
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
                              <a class="btn btn-primary" href="#" role="button">
                                Download
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
                      return <tr>{row.name}</tr>;
                    })}
                    <tr>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="filename"
                          placeholder="file"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="qty"
                          placeholder="qty"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="todo"
                          placeholder="todo"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="duedate"
                          placeholder="duedate"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="startdate"
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="enddate"
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="note"
                          placeholder="note"
                        />
                      </td>
                      <td>
                        <a class="btn btn-primary" href="#" role="button">
                          Download
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col d-flex justify-content-end">
              <button type="button" class="btn btn-primary float-right mr-1">
                Save
              </button>
              <button type="button" class="btn btn-warning  float-right ml-1">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

viewPromotion.propTypes = {
  ambil: PropTypes.object.isRequired,
  getPromotion: PropTypes.func.isRequired,
  getDesignOne: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  getFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ambil: state.promot
});

export default connect(
  mapStateToProps,
  { getPromotion, getDesignOne, getItem, getFile }
)(viewPromotion);
