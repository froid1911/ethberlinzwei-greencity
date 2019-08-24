import React from "react";
import classNames from "classnames";
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

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

import { withRouter } from "react-router-dom";

import Header from '../../components/Header/Header';

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  button: {
      display: 'block'
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

  componentDidMount() {}

  render() {
    const { classes, onClose, ...other } = this.props;

    console.log(this.props)
    return (
    <div>
        <Header />
        <main className={classes.layout}>
        <h1>{this.props.location.state.challenge.name}</h1>
            <img src={this.props.location.state.challenge.image} style={{borderRadius: '50%'}} />
            
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value="bla"
          onChange={() => console.log}
          margin="normal"
          variant="outlined"
        />
         <Button variant="contained" color="green" className={classes.button}>
        Start
      </Button>
      </main>
    </div>
      
    );
  }
}

Seminar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Seminar));
