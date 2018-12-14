import React from "react";
import { getAllPromotion } from "../../../../actions/promotionActions";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

class addPromotionD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      alertData: {
        status: 0,
        message: "",
        code: ""
      }
    };
  }

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
              <li className="active">List Marketing Promotion</li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <h4>List Marketing Promotion</h4>
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
                      placeholder="transactioncode"
                      disabled
                    />
                  </div>
                </div>
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
                      id="eventcode"
                      placeholder="eventcode"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
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
                      placeholder="requestby"
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
                      placeholder="requestdate"
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
                      placeholder="titleheader"
                    />
                  </div>
                </div>
                <div class="form-group col-md-6 row">
                  <label for="note" class="col-4 col-form-label text-right">
                    * Note
                  </label>
                  <div class="col-8">
                    <textarea class="form-control" aria-label="With textarea" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                      placeholder="designcode"
                      disabled
                    />
                  </div>
                </div>
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
                      placeholder="titleheader"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
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
                      placeholder="requestby"
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
                      placeholder="requestdate"
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
                    <textarea class="form-control" aria-label="With textarea" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <tr>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="productname"
                          placeholder="productname"
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="productdescription"
                          placeholder="productdescription"
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          placeholder="title"
                          disabled
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
                        <select name="tode" id="tode" class="form-control">
                          <option value="no">No</option>
                          <option value="yes">yes</option>
                          <option value="" selected>
                            {" "}
                            -{" "}
                          </option>
                        </select>
                      </td>
                      <td>
                        <input type="date" class="form-control" id="duedate" />
                      </td>
                      <td>
                        <input
                          type="date"
                          class="form-control"
                          id="startdate"
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="date"
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
          <div class="card mb-3">
            <div class="card-body">
              <h6 class="card-title">UPLOAD FILE</h6>
              <hr />
              <div class="form-group row">
                <div class="col">
                  <button type="submit" class="btn btn-primary">
                    Add Item
                  </button>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-borderless table-sm">
                  <thead>
                    <tr>
                      <th />
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
                    <tr>
                      <td colspan="2">
                        <div class="custom-file">
                          <input
                            type="file"
                            class="custom-file-input"
                            id="customFile"
                          />
                          <label class="custom-file-label" for="customFile">
                            Choose file
                          </label>
                        </div>
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
                        <select name="tode" id="tode" class="form-control">
                          <option value="no">No</option>
                          <option value="yes">yes</option>
                          <option value="" selected>
                            {" "}
                            -{" "}
                          </option>
                        </select>
                      </td>
                      <td>
                        <input type="date" class="form-control" id="duedate" />
                      </td>
                      <td>
                        <input
                          type="date"
                          class="form-control"
                          id="startdate"
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="date"
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
                        <a class="btn btn-danger" href="#" role="button">
                          X
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

addPromotionD.propTypes = {
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
)(addPromotionD);
