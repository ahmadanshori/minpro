import React from "react";
import apiconfig from "../config/api.config.json";
import axios from "axios";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {
        name: "",
        controller: ""
      },
      showCreateMenu: false,
      side: [],
      child: [],
      temp: [],
      alertData: {
        status: 0,
        message: ""
      },
      classes: props
    };
  }

  getListMenu() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.SIDEBAR,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    axios(option)
      .then(response => {
        this.setState({
          side: response.data.message
        });
        this.state.side.map(master => {
          return this.state.temp.push(master);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getListMenu();
  }
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className={this.state.classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={this.state.classes.heading} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          {this.state.side.map((master, ind) => (
            <ExpansionPanel>
              <ExpansionPanelSummary
                // onClick={this.state.getListMenu}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography className={this.state.classes.heading}>
                  {master._id}
                </Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails>
                <Typography>
                  <ul className="nav flex-column mb-2">
                    {master.name.map((row, index) => (
                      <li className="nav-item">
                        <a className="nav-link" href={master.controller[index]}>
                          {/* {master.description[ind].map((des)=>{des[index]})} */}
                          {row}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      </nav>
    );
  }
}
export default Sidebar;
