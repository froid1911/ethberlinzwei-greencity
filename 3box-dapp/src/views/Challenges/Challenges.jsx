import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Redirect } from "react-router-dom";

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

import fahrrad from "../../assets/fahrrad.jpg";
import baum from "../../assets/baum.jpg";

import "./Challenges.css";

import Nav from "../../components/Nav/Nav";
import Challenge from "./Challenge/Challenge";

import { makeStyles } from "@material-ui/core/styles";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    position: "relative"
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
    }
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  cardHeader: {
    backgroundColor: "#54A657",
    color: "white"
  },
  cardContent: {
    backgroundColor: "white"
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
    backgroundColor: "white"
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`
  },
  card: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Challenges extends Component {
  state = {
    challenges: [
      {
        name: "Bicycling",
        description: "Ride a bike and protect the environment",
        image: fahrrad,
        reward: 2,
        goal: "5 km"
      },
      {
        name: "Give water to trees",
        description: "Save the trees!",
        image: baum,
        reward: 1,
        goal: "tree"
      }
    ]
  };

  onClick = (name, image, reward, goal) => {
    this.setState({
      redirect: (
        <Redirect
          to={{
            pathname: "/challengePage",
            state: { challenge: { name, image, reward, goal } }
          }}
        />
      )
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes } = this.props;

    let challenges = this.state.challenges.map(challenge => (
      <Grid item key={challenge.name} xs={12}>
        <Card
          className={classes.card}
          onClick={() =>
            this.onClick(
              challenge.name,
              challenge.image,
              challenge.reward,
              challenge.goal
            )
          }
        >
          <CardHeader
            title={challenge.name}
            classes={{
              title: classes.cardHeader
            }}
            className={classes.cardHeader}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="subtitle1" align="center">
              <img className="img-fluid w-100" src={challenge.image} />
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            {/* <Button component={} to={`/seminar/${challenge.name}`} fullWidth variant="outlined" color="primary">
              Weitere Informationen ...
            </Button> */}
          </CardActions>
        </Card>
      </Grid>
    ));

    return (
      <div>
        {this.state.redirect ? this.state.redirect : null}
        <div class="container mt-5">{challenges}</div>
      </div>
    );
  }
}

Challenges.propTypes = {
  name: PropTypes.string,
  currentAddress: PropTypes.string,
  image: PropTypes.array,
  handleSignInUp: PropTypes.func.isRequired
};

Challenges.defaultProps = {
  name: "",
  currentAddress: "",
  image: null
};

const mapState = state => ({
  name: state.myData.name,
  image: state.myData.image,
  currentAddress: state.userState.currentAddress
});

export default withRouter(connect(mapState)(withStyles(styles)(Challenges)));
