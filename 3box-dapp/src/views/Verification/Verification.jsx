import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import FilterIcon from "@material-ui/icons/FilterList";
import Dialog from "@material-ui/core/Dialog";
import SvgIcon from '@material-ui/core/SvgIcon';
import GreenCityLogo from '../../assets/GreenCity.png'
import Icon from '@material-ui/core/Icon';

import Paper from '@material-ui/core/Paper';

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

import { withRouter } from "react-router-dom";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  red: {
      backgroundColor: 'red'
  },
  button: {
    display: "block",
    backgroundColor: 'green'
  },
  toolbarTitle: {
    flex: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    },
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: "white"
  },
  cardContent: {
    backgroundColor: theme.palette.secondary.main
  },
  cardSeminar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing.unit * 2
  },
  cardActions: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing.unit * 2
    },
    backgroundColor: theme.palette.secondary.main
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});

const tiers = [
  {
    title: "Agile Softwareentwicklung",
    participants: "2",
    maxParticipants: "4",
    description: [
      "In dieser Schulung lernt ihr die Grundlagen agiler Softwareentwicklung bei MaibornWolff kennen. Ihr bekommt einen Überblick über die in unserer Firma geläufigsten agilen Frameworks und Methoden und versteht die Prinzipien von Arbeit und Selbstorganisation in agilen und crossfunktionalen Teams."
    ],
    buttonText: "Weitere Informationen ...",
    buttonVariant: "outlined"
  },
  {
    title: "Agile Softwareentwicklung II",
    participants: "3",
    maxParticipants: "4",
    description: [
      "In dieser Schulung lernt ihr die Grundlagen agiler Softwareentwicklung bei MaibornWolff kennen. Ihr bekommt einen Überblick über die in unserer Firma geläufigsten agilen Frameworks und Methoden und versteht die Prinzipien von Arbeit und Selbstorganisation in agilen und crossfunktionalen Teams."
    ],
    buttonText: "Weitere Informationen ...",
    buttonVariant: "outlined"
  }
];

class Seminar extends React.Component {
  state = {};


  onLike = (e) => {
       e.preventDefault();
   
  }

  onDislike = (e) => {
    e.preventDefault();

}

  componentDidMount() {}

  render() {
    const { classes, onClose, ...other } = this.props;

    console.log(this.props);
    return (
      <div>
        <main className={classes.layout}>
            <h1 className="text-center mb-5">Challenge</h1>
            <Paper style={{padding: '2rem'}}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="row mb-2"> <h2 className="h3 text-center">Challenge</h2></div>
                    <div className="row mb-2"><img
                    src={GreenCityLogo}
                    style={{ borderRadius: "50%", height: '10rem', width: 'auto' }}
                /></div>
                    {/* <div className="row mb-2"><TextField
                    id="outlined-name"
                    label="Bike ID"
                    className={classes.textField}
                    value={this.state.id}
                    onChange={(e) => this.setState({id: e.target.value})}
                    margin="normal"
                    variant="outlined"
                /></div>
               
               <div className="row mb-2">
                <p className="h5">Earn {this.props.location.state.challenge.reward} <img src={GreenCityLogo} style={{height: '1.5rem', width: 'auto'}} /> per {this.props.location.state.challenge.goal}</p>
                </div> */}
                
                <div className="row">
                <Button onClick={this.onLike} variant="contained" className={classes.button}>
                LIKE
                </Button>
                <Button onClick={this.onDislike} variant="contained" className={classes.button} className={classes.red}>
                DISLIKE
                </Button>
                </div>
                
                </div>
                
            </Paper>
          
        </main>
      </div>
    );
  }
}

Seminar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Seminar));
