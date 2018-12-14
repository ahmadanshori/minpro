import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllSouvenir, getUnits } from "../../actions/souvenirAction";
import { getAssignToName } from "../../actions/designAction";
import { Search, CreateOutlined, DeleteOutlined } from "@material-ui/icons";
import Spinner from "../common/SpinnerTable";
import CreateSouvenir from "./CreateSouvenir";
import ReadSouvenir from "./ReadSouvenir";
import UpdateSouvenir from "./UpdateSouvenir";
import DeleteSouvenir from "./DeleteSouvenir";

// Search Form Components
import TextField from "../common/TextField";
import SelectList from "../common/SelectList";

class SouvenirList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCreate: false,
      viewModal: false,
      editModal: false,
      deleteModal: false,
      currentSouvenir: {},
      units: [],
      souvenirs: [],
      errorName: "",
      errorUnit: "",
      searchCode: "",
      searchName: "",
      searchUnit: "",
      searchDate: "",
      searchCreated: "",
      search: false,
      employee: []
    };
  }

  componentDidMount() {
    this.props.getAllSouvenir();
    this.props.getUnits();
    this.props.getAssignToName();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      units: newProps.souvenir.units,
      souvenirs: newProps.souvenir.souvenirs,
      employee: newProps.design.assign
    });
  }

  // Function to Show Create Menu Form Modal
  showHandler = () => {
    this.setState({ showCreate: true });
  };

  // Function to Close Create Menu Form Modal
  closeHandler = () => {
    this.setState({ showCreate: false });
  };

  // Function to Edit Single Souvenir
  onEditModal = souvenirId => {
    let singleSouvenir = {};
    this.state.souvenirs.forEach(souvenir => {
      if (souvenirId === souvenir._id) {
        singleSouvenir = souvenir;
      }
    });

    this.setState({
      currentSouvenir: singleSouvenir,
      editModal: true
    });
  };

  // Function to View Single Souvenir
  onViewModal = souvenirId => {
    let singleSouvenir = {};
    this.state.souvenirs.forEach(souvenir => {
      if (souvenirId === souvenir._id) {
        singleSouvenir = souvenir;
      }
    });

    this.setState({
      currentSouvenir: singleSouvenir,
      viewModal: true
    });
  };

  // Function to Show Delete Modal Confirmation
  onDeleteModal = code => {
    const singleSouvenir = {
      code: code
    };

    this.setState({
      currentSouvenir: singleSouvenir,
      deleteModal: true
    });
  };

  // Function to Get Units Name
  getUnits = code => {
    let name = "";

    this.state.units.forEach(unit => {
      if (unit.code === code) {
        name = unit.name;
      }
    });

    return name;
  };

  getEmployee(employeeNumber) {
    let employeeName = "";
    if (employeeNumber !== null) {
      this.state.employee.forEach(staff => {
        if (staff.employee_number === employeeNumber) {
          employeeName = staff.first_name + " " + staff.last_name;
        }
      });
    } else {
      employeeName = "-";
    }

    return employeeName;
  }

  closeModal = () => {
    this.setState({
      showCreate: false,
      viewModal: false,
      editModal: false,
      deleteModal: false,
      errorName: "",
      errorUnit: ""
    });
  };

  // Handler Search Change
  onSearch = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Search Handler
  submitSearch = e => {
    e.preventDefault();

    const {
      searchCode,
      searchName,
      searchUnit,
      searchDate,
      searchCreated
    } = this.state;

    const code = new RegExp(searchCode, "i");
    const name = new RegExp(searchName, "i");
    const unit = new RegExp(searchUnit);
    const created_date =
      searchDate === ""
        ? new RegExp("")
        : new RegExp(moment(searchDate, "YYYY-MM-DD").format("DD/MM/YYYY"));
    const created_by = new RegExp(searchCreated, "i");

    const filtered = [];
    this.state.souvenirs.forEach(souvenir => {
      if (
        code.test(souvenir.code) &&
        name.test(souvenir.name) &&
        unit.test(souvenir.m_unit_id) &&
        created_date.test(souvenir.created_date) &&
        created_by.test(this.getEmployee(souvenir.created_by))
      ) {
        filtered.push({ ...souvenir });
      }
    });

    // Update Souvenirs State
    // According by Search Keyword
    this.setState({
      souvenirs: filtered,
      search: true
    });
  };

  // Restore Souvenirs Data
  onRestore = e => {
    e.preventDefault();
    this.setState({
      souvenirs: this.props.souvenir.souvenirs,
      search: false,
      searchCode: "",
      searchName: "",
      searchUnit: "",
      searchDate: "",
      searchCreated: ""
    });
  };

  render() {
    const { souvenirs, units, status, message } = this.props.souvenir;
    const { user } = this.props.auth;

    const options = [];
    options.push({ label: "Select Unit Name", value: "" });
    units.forEach(unit =>
      options.push({
        label: unit.name,
        value: unit.code
      })
    );

    let souvenirLabel;
    let souvenirList;
    // Inline Table Style
    const columnWidth = { width: "100%" };
    const rowWidth = { width: "15%" };

    if (souvenirs === null || units === null) {
      souvenirList = <Spinner />;
    } else {
      // Style for Souvenir Name
      const capitalize = {
        textTransform: "capitalize"
      };

      if (this.state.souvenirs.length > 0) {
        souvenirList = this.state.souvenirs.map((souvenir, index) => (
          <tr key={souvenir._id} className="text-center">
            <td>{index + 1}</td>
            <td>{souvenir.code}</td>
            <td style={capitalize}>{souvenir.name}</td>
            <td>{this.getUnits(souvenir.m_unit_id)}</td>
            <td>{souvenir.created_date}</td>
            <td>{this.getEmployee(souvenir.created_by)}</td>
            <td nowrap="true">
              <Link to="#">
                <Search
                  onClick={() => {
                    this.onViewModal(souvenir._id);
                  }}
                />
              </Link>
              <Link to="#">
                <CreateOutlined
                  onClick={() => {
                    this.onEditModal(souvenir._id);
                  }}
                />
              </Link>
              <Link to="#">
                <DeleteOutlined
                  onClick={() => {
                    this.onDeleteModal(souvenir.code);
                  }}
                />
              </Link>
            </td>
          </tr>
        ));

        souvenirLabel = (
          <tr className="text-center font-weight-bold" style={columnWidth}>
            <td>No</td>
            <td style={rowWidth}>Souvenir Code</td>
            <td style={rowWidth}>Souvenir Name</td>
            <td style={rowWidth}>Unit</td>
            <td style={rowWidth}>Created Date</td>
            <td style={rowWidth}>Created By</td>
            <td>Action</td>
          </tr>
        );
      } else {
        souvenirLabel = (
          <tr className="text-center">
            <td>Oops, No Souvenir List Found!</td>
          </tr>
        );
      }
    }

    const width = {
      width: "5%"
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* Create Souvenir Modal */}
            <CreateSouvenir
              m_employee_id={user.m_employee_id}
              units={units}
              create={this.state.showCreate}
              closeHandler={this.closeHandler}
              closeModal={this.closeModal}
              errorName={this.state.errorName}
              errorUnit={this.state.errorUnit}
            />
            {/* Update Souvenir Modal */}
            <UpdateSouvenir
              m_employee_id={user.m_employee_id}
              units={units}
              update={this.state.editModal}
              souvenir={this.state.currentSouvenir}
              closeModal={this.closeModal}
              errorName={this.state.errorName}
              errorUnit={this.state.errorUnit}
            />
            {/* View Souvenir Modal */}
            <ReadSouvenir
              units={units}
              view={this.state.viewModal}
              souvenir={this.state.currentSouvenir}
              closeModal={this.closeModal}
            />
            {/* Delete Souvenir Modal */}
            <DeleteSouvenir
              m_employee_id={user.m_employee_id}
              delete={this.state.deleteModal}
              souvenir={this.state.currentSouvenir}
              closeModal={this.closeModal}
            />

            <div className="card border-primary mb-2">
              <div className="card-header lead">List Souvenir</div>
              <div className="card-body">
                <nav aria-label="breadcrumb mb-4">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Master Souvenir
                    </li>
                  </ol>
                </nav>
                <div className="text-right">
                  <button
                    onClick={this.showHandler}
                    type="button"
                    className="btn btn-primary"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2">
                  <form onSubmit={this.submitSearch}>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <TextField
                              placeholder="Souvenir Code"
                              name="searchCode"
                              value={this.state.searchCode}
                              onChange={this.onSearch}
                            />
                          </td>
                          <td>
                            <TextField
                              placeholder="Souvenir Name"
                              name="searchName"
                              value={this.state.searchName}
                              onChange={this.onSearch}
                            />
                          </td>
                          <td>
                            <SelectList
                              placeholder="*Select Unit Name"
                              name="searchUnit"
                              value={this.state.searchUnit}
                              onChange={this.onSearch}
                              options={options}
                            />
                          </td>
                          <td>
                            <TextField
                              type="date"
                              min="2018-01-01"
                              max={moment().format("YYYY-MM-DD")}
                              name="searchDate"
                              value={this.state.searchDate}
                              onChange={this.onSearch}
                            />
                          </td>
                          <td>
                            <TextField
                              placeholder="Created By"
                              name="searchCreated"
                              value={this.state.searchCreated}
                              onChange={this.onSearch}
                            />
                          </td>
                          <td nowrap="true" style={width}>
                            <div className="form-group">
                              {this.state.search === true ? (
                                <button
                                  className="btn btn-block btn-default"
                                  onClick={this.onRestore}
                                >
                                  Go Back!
                                </button>
                              ) : (
                                <input
                                  type="submit"
                                  value="Search"
                                  className="btn btn-block btn-warning"
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </div>
                {/* Alert Messages */}
                {status === 1 && (
                  <div className="mt-2 alert alert-success">{message}</div>
                )}
                {status === 2 && (
                  <div className="mt-2 alert alert-primary">{message}</div>
                )}
                {status === 3 && (
                  <div className="mt-2 alert alert-danger">{message}</div>
                )}

                <table className="table table-responsive table-stripped">
                  <thead>{souvenirLabel}</thead>
                  <tbody>{souvenirList}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SouvenirList.propTypes = {
  getAssignToName: PropTypes.func.isRequired,
  getAllSouvenir: PropTypes.func.isRequired,
  getUnits: PropTypes.func.isRequired,
  souvenir: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  souvenir: state.souvenir,
  auth: state.auth,
  design: state.design
});

export default connect(
  mapStateToProps,
  { getAllSouvenir, getUnits, getAssignToName }
)(SouvenirList);
