import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";


import PropTypes from 'prop-types';
import SwipeableViews from "react-swipeable-views";

import * as routes from "../../utils/routes";
// import ThreeBoxLogo from '../../assets/ThreeBoxLogoWhite.svg';
import ThreeBoxCloudWhite from "../../assets/3BoxCloudWhite.svg";
import ThreeBoxCloudWhiteNoShadow from "../../assets/3BoxCloudWhiteNoShadow.svg";
import ThreeBoxCloud from "../../assets/3BoxCloud.svg";
import TriangleWhite from "../../assets/TriangleWhite.svg";
import TriangleBlue from "../../assets/TriangleBlue.svg";
import TriangleBlack from "../../assets/TriangleBlack.svg";
import NewProfileCard from "../../assets/NewProfileCard.png";
import Trust from "../../assets/Trust.svg";
import HighFive from "../../assets/HighFive.svg";
// import Authentication from '../../assets/Authentication.svg';
import Collaboration from "../../assets/Collaboration.svg";
import Profiles from "../../assets/Profiles.svg";
import Messaging from "../../assets/Messaging.svg";
import Storage from "../../assets/Storage.svg";
import DaoStack from "../../assets/DaoStack.png";
import Aragon from "../../assets/Aragon.png";
import Consensys from "../../assets/Consensys.png";
import MetaMask from "../../assets/MetaMask.png";
import Foam from "../../assets/FOAMpartner.png";
import ColorCubes from "../../assets/ColorCubes.svg";
import ColorCubesMobile from "../../assets/ColorCubesMobile.svg";
import "../styles/Landing.css";
import "../styles/NewLanding.css";
import "../../components/styles/Nav.css";
import DiscordButton from "./components/DiscordButton";
import Footer from "./components/Footer";

const styles = {
  backgroundImage: `url("${ColorCubes}")`,
  backgroundRepeat: "absolute",
  slide: {
    padding: 15,
    minHeight: 100,
    color: "#fff"
  },
  slide1: {
    background: "#FEA900"
  },
  slide2: {
    background: "#B3DC4A"
  },
  slide3: {
    background: "#6AC0FF"
  }
};

const LoginToHubButton = () => (
  <div id="actionButtons" className="hero_login">
    <Link to={routes.HUB}>
      <button type="button">Sign in to Hub</button>
    </Link>
  </div>
);

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    
    const { handleSignInUp } = this.props;
    return (
      <div className="landing_page">
        <main className="hero">
          <div className="hero_text">
            <div className="hero_copy_wrapper">
              <SwipeableViews>
                <div>
                  <h1>What is Green City about?</h1>
                  <p>
                    Help make the world better by solving challenges that help
                    the environment and earn coins for it!
                  </p>
                </div>
                <div>
                  <h1>What is your benefit?</h1>
                  <p>
                    You can use your coins for entry to public institutions or
                    influence how the government money is spent.
                  </p>
                </div>
                <div>
                  <h1>Ready to get started?</h1>
                  <p>
                    Log in with your public 3box profile or create a new
                    account.
                  </p>
                  <LoginToHubButton />
                </div>
              </SwipeableViews>
            </div>
          </div>
          <div className="hero_graphic">
            <div style={styles} className="hero_graphic_colorcubes-dtw" />
            <img
              src={ColorCubesMobile}
              alt="Color cubes"
              className="hero_graphic_colorcubes-mobile"
            />
            <button type="button" onClick={() => handleSignInUp(false)} className="main_profileCard_card_login">
                Log In
              </button>
          </div>
        </main>
      </div>
    );
  }
}

Landing.propTypes = {
   handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool
};

Landing.defaultProps = {
   isLoggedIn: false, 
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn
});

export default withRouter(connect(mapState)(Landing));
