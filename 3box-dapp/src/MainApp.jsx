import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as routes from "./utils/routes";
import { normalizeURL, matchProtectedRoutes } from "./utils/funcs";

import APIs from "./views/Landing/API/APIs";
import Dapp from "./views/Landing/Dapp/Dapp";
import LandingNew from "./views/Landing/LandingNew";
import Partners from "./views/Landing/Partners";
import Team from "./views/Landing/Team";
import Spaces from "./views/Spaces/Spaces";
import MyProfile from "./views/Profile/MyProfile";
import PubProfile from "./views/Profile/PubProfile";
import NoMatch from "./views/Landing/NoMatch";
import EditProfile from "./views/Profile/EditProfile";
import Careers from "./views/Landing/Careers";
import Privacy from "./views/Landing/Privacy";
import Terms from "./views/Landing/Terms";
import Create from "./views/Landing/Create";
import NavLanding from "./components/NavLanding";
import AppHeaders from "./components/AppHeaders";
import AppModals from "./components/AppModals";
import actions from "./state/actions";
import "./index.css";
import Nav from "./components/Nav";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#54A657"
    },
    seondary: {
      main: "white"
    }
  }
});

const {
  handleSignInModal,
  closeErrorModal,
  handleRequireWalletLoginModal,
  handleSwitchedNetworkModal,
  handleAccessModal,
  closeRequireMetaMaskModal,
  handleConsentModal,
  handleDeniedAccessModal,
  handleLoggedOutModal,
  handleSwitchedAddressModal,
  requireMetaMaskModal,
  handleMobileWalletModal,
  handleOnboardingModal,
  handleFollowingPublicModal,
  handleContactsModal
} = actions.modal;

const {
  getMyProfileValue,
  getMyDID,
  getCollectibles,
  getMyMemberSince,
  getVerifiedPublicGithub,
  getVerifiedPublicTwitter,
  getVerifiedPrivateEmail,
  getActivity,
  // getMyFollowing,
  // getPublicFollowing,
  saveFollowing
} = actions.profile;

const { getMySpacesData, convert3BoxToSpaces } = actions.spaces;

const { openBox, handleSignOut, requestAccess } = actions.signin;

const { checkWeb3, initialCheckWeb3, checkNetwork } = actions.land;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onBoardingModalMobileOne: false,
      onBoardingModalMobileTwo: false,
      onBoardingModalMobileThree: false
    };
  }

  render() {
    const {
      showDifferentNetworkModal,
      accessDeniedModal,
      errorMessage,
      allowAccessModal,
      alertRequireMetaMask,
      provideConsent,
      signInToWalletModal,
      signInModal,
      mobileWalletRequiredModal,
      directLogin,
      loggedOutModal,
      switchedAddressModal,
      prevNetwork,
      currentNetwork,
      onBoardingModal,
      onBoardingModalTwo,
      isFetchingThreeBox,
      prevAddress,
      showErrorModal,
      isLoggedIn,
      isSignedIntoWallet,
      location,
      onSyncFinished,
      isSyncing,
      hasSignedOut,
      onOtherProfilePage,
      showFollowingPublicModal,
      otherAddressToFollow,
      showContactsModal,
      otherFollowing,
      otherName,
      following,
      otherProfileAddress,
      onBoardingModalMobileOne,
      onBoardingModalMobileTwo,
      onBoardingModalMobileThree
    } = this.props;

    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);
    const mustConsentError =
      errorMessage &&
      errorMessage.message &&
      errorMessage.message.substring(0, 65) ===
        "Error: MetaMask Message Signature: User denied message signature.";
    const landing = pathname === routes.LANDING ? "landing" : "";
    const { userAgent: ua } = navigator;
    const isIOS = ua.includes("iPhone");
    const isMyProfilePath = matchProtectedRoutes(normalizedPath.split("/")[2]);

    return (
      <MuiThemeProvider theme={theme}>
<div className="App">
          <AppHeaders />

          {!isMyProfilePath &&
          !isLoggedIn && ( // show landing nav when user is not logged in, 3box is not fetching, and when route is not a protected route
              <NavLanding
                handleSignInUp={this.handleSignInUp}
                onOtherProfilePage={onOtherProfilePage}
                landing={landing}
                pathname={normalizedPath}
              />
            )}

          {!isMyProfilePath && isLoggedIn && <Nav />}

          <AppModals
            isFetchingThreeBox={isFetchingThreeBox}
            onSyncFinished={onSyncFinished}
            isSyncing={isSyncing}
            hasSignedOut={hasSignedOut}
            allowAccessModal={allowAccessModal}
            directLogin={directLogin}
            isMyProfilePath={isMyProfilePath}
            alertRequireMetaMask={alertRequireMetaMask}
            accessDeniedModal={accessDeniedModal}
            signInToWalletModal={signInToWalletModal}
            signInModal={signInModal}
            isIOS={isIOS}
            mobileWalletRequiredModal={mobileWalletRequiredModal}
            errorMessage={errorMessage}
            mustConsentError={mustConsentError}
            showErrorModal={showErrorModal}
            prevNetwork={prevNetwork}
            currentNetwork={currentNetwork}
            showDifferentNetworkModal={showDifferentNetworkModal}
            loggedOutModal={loggedOutModal}
            switchedAddressModal={switchedAddressModal}
            prevAddress={prevAddress}
            onBoardingModal={onBoardingModal}
            onBoardingModalTwo={onBoardingModalTwo}
            provideConsent={provideConsent}
            showContactsModal={showContactsModal}
            showFollowingPublicModal={showFollowingPublicModal}
            onBoardingModalMobileOne={onBoardingModalMobileOne}
            onBoardingModalMobileTwo={onBoardingModalMobileTwo}
            onBoardingModalMobileThree={onBoardingModalMobileThree}
            otherAddressToFollow={otherAddressToFollow}
            otherFollowing={otherFollowing}
            otherName={otherName}
            following={following}
            otherProfileAddress={otherProfileAddress}
            handleContactsModal={this.props.handleContactsModal}
            handleRequireWalletLoginModal={
              this.props.handleRequireWalletLoginModal
            }
            handleSignInModal={this.props.handleSignInModal}
            handleMobileWalletModal={this.props.handleMobileWalletModal}
            handleConsentModal={this.props.handleConsentModal}
            handleDeniedAccessModal={this.props.handleDeniedAccessModal}
            closeErrorModal={this.props.closeErrorModal}
            handleSwitchedNetworkModal={this.props.handleSwitchedNetworkModal}
            handleLoggedOutModal={this.props.handleLoggedOutModal}
            handleSignOut={this.props.handleSignOut}
            handleSwitchedAddressModal={this.props.handleSwitchedAddressModal}
            handleOnboardingModal={this.props.handleOnboardingModal}
            handleAccessModal={this.props.handleAccessModal}
            handleNextMobileModal={this.handleNextMobileModal}
            closeRequireMetaMaskModal={this.props.closeRequireMetaMaskModal}
            handleFollowingPublicModal={this.props.handleFollowingPublicModal}
            saveFollowing={this.props.saveFollowing}
          />

          <Switch>
            <Route
              exact
              path={routes.LANDING}
              render={() => (
                <LandingNew
                  handleSignInUp={this.handleSignInUp}
                  isLoggedIn={isLoggedIn}
                  errorMessage={errorMessage}
                  showErrorModal={showErrorModal}
                  isSignedIntoWallet={isSignedIntoWallet}
                />
              )}
            />

            <Route
              path={routes.API}
              render={() => (
                <APIs
                  handleSignInUp={this.handleSignInUp}
                  isLoggedIn={isLoggedIn}
                  errorMessage={errorMessage}
                  showErrorModal={showErrorModal}
                  isSignedIntoWallet={isSignedIntoWallet}
                />
              )}
            />

            <Route
              exact
              path={routes.HUB}
              render={() => (
                <Dapp
                  handleSignInUp={this.handleSignInUp}
                  isLoggedIn={isLoggedIn}
                  errorMessage={errorMessage}
                  showErrorModal={showErrorModal}
                  isSignedIntoWallet={isSignedIntoWallet}
                />
              )}
            />

            <Route exact path={routes.CAREERS} render={() => <Careers />} />

            <Route exact path={routes.TEAM} render={() => <Team />} />

            <Route
              exact
              path={routes.JOBS}
              render={() => <Redirect to={routes.CAREERS} />}
            />

            <Route
              exact
              path="(^[/][0][xX]\w{40}\b)/activity"
              component={MyProfile}
            />
            <Redirect from="/profile" to="/" />
            <Redirect from="/editprofile" to="/" />

            <Route
              exact
              path="(^[/][0][xX]\w{40}\b)/details"
              component={MyProfile}
            />

            <Route
              exact
              path="(^[/][0][xX]\w{40}\b)/collectibles"
              component={MyProfile}
            />

            <Route
              exact
              path="(^[/][0][xX]\w{40}\b)/following"
              component={MyProfile}
            />

            <Route exact path="(^[/][0][xX]\w{40}\b)/data" component={Spaces} />

            <Route
              exact
              path="(^[/][0][xX]\w{40}\b)/edit"
              component={EditProfile}
            />

            <Route exact path={routes.PARTNERS} render={() => <Partners />} />

            <Route exact path={routes.PRIVACY} render={() => <Privacy />} />

            <Route exact path={routes.TERMS} render={() => <Terms />} />

            <Route
              path={routes.CREATE}
              exact
              render={() => (
                <Create
                  isLoggedIn={isLoggedIn}
                  handleSignInUp={this.handleSignInUp}
                />
              )}
            />

            <Route exact path="(^[/][0][xX]\w{40}\b)" component={PubProfile} />

            <Route
              render={() => (
                <NoMatch
                  isLoggedIn={isLoggedIn}
                  handleSignInUp={this.handleSignInUp}
                />
              )}
            />
          </Switch>
      </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  openBox: PropTypes.func.isRequired,
  requestAccess: PropTypes.func.isRequired,
  getMyProfileValue: PropTypes.func.isRequired,
  checkWeb3: PropTypes.func.isRequired,
  initialCheckWeb3: PropTypes.func.isRequired,
  // getMyFollowing: PropTypes.func.isRequired,
  // getPublicFollowing: PropTypes.func.isRequired,
  getMyDID: PropTypes.func.isRequired,
  getCollectibles: PropTypes.func.isRequired,
  getMySpacesData: PropTypes.func.isRequired,
  convert3BoxToSpaces: PropTypes.func.isRequired,
  getMyMemberSince: PropTypes.func.isRequired,
  getVerifiedPublicGithub: PropTypes.func.isRequired,
  getVerifiedPublicTwitter: PropTypes.func.isRequired,
  getVerifiedPrivateEmail: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  requireMetaMaskModal: PropTypes.func.isRequired,
  handleMobileWalletModal: PropTypes.func.isRequired,
  handleSwitchedNetworkModal: PropTypes.func.isRequired,
  handleAccessModal: PropTypes.func.isRequired,
  closeRequireMetaMaskModal: PropTypes.func.isRequired,
  handleConsentModal: PropTypes.func.isRequired,
  handleDeniedAccessModal: PropTypes.func.isRequired,
  handleRequireWalletLoginModal: PropTypes.func.isRequired,
  handleSignInModal: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func,
  checkNetwork: PropTypes.func.isRequired,
  closeErrorModal: PropTypes.func.isRequired,
  handleLoggedOutModal: PropTypes.func.isRequired,
  handleSwitchedAddressModal: PropTypes.func.isRequired,
  handleOnboardingModal: PropTypes.func.isRequired,
  saveFollowing: PropTypes.func.isRequired,

  showDifferentNetworkModal: PropTypes.bool,
  onSyncFinished: PropTypes.bool,
  hasSignedOut: PropTypes.bool,
  isSyncing: PropTypes.bool,
  accessDeniedModal: PropTypes.bool,
  errorMessage: PropTypes.string,
  allowAccessModal: PropTypes.bool,
  alertRequireMetaMask: PropTypes.bool,
  hasWeb3: PropTypes.bool,
  provideConsent: PropTypes.bool,
  signInToWalletModal: PropTypes.bool,
  signInModal: PropTypes.bool,
  mobileWalletRequiredModal: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  directLogin: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  isSignedIntoWallet: PropTypes.bool,
  loggedOutModal: PropTypes.bool,
  switchedAddressModal: PropTypes.bool,
  onBoardingModal: PropTypes.bool,
  onBoardingModalTwo: PropTypes.bool,
  isFetchingThreeBox: PropTypes.bool,
  showContactsModal: PropTypes.bool,
  onOtherProfilePage: PropTypes.bool,
  prevNetwork: PropTypes.string,
  currentNetwork: PropTypes.string,
  currentAddress: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  prevAddress: PropTypes.string,
  otherAddressToFollow: PropTypes.string
};

App.defaultProps = {
  showDifferentNetworkModal: false,
  handleSignOut,
  hasWeb3: false,
  accessDeniedModal: false,
  onSyncFinished: false,
  hasSignedOut: false,
  onOtherProfilePage: false,
  isSyncing: false,
  showContactsModal: false,
  errorMessage: "",
  allowAccessModal: false,
  alertRequireMetaMask: false,
  provideConsent: false,
  signInToWalletModal: false,
  signInModal: false,
  mobileWalletRequiredModal: false,
  showErrorModal: false,
  loggedOutModal: false,
  switchedAddressModal: false,
  onBoardingModal: false,
  onBoardingModalTwo: false,
  isFetchingThreeBox: false,
  isLoggedIn: false,
  isSignedIntoWallet: false,
  prevNetwork: "",
  currentNetwork: "",
  prevAddress: "",
  directLogin: "",
  currentAddress: "",
  otherAddressToFollow: ""
};

const mapState = state => ({
  showDifferentNetworkModal: state.uiState.showDifferentNetworkModal,
  allowAccessModal: state.uiState.allowAccessModal,
  alertRequireMetaMask: state.uiState.alertRequireMetaMask,
  provideConsent: state.uiState.provideConsent,
  signInToWalletModal: state.uiState.signInToWalletModal,
  signInModal: state.uiState.signInModal,
  mobileWalletRequiredModal: state.uiState.mobileWalletRequiredModal,
  directLogin: state.uiState.directLogin,
  loggedOutModal: state.uiState.loggedOutModal,
  switchedAddressModal: state.uiState.switchedAddressModal,
  onBoardingModal: state.uiState.onBoardingModal,
  onBoardingModalTwo: state.uiState.onBoardingModalTwo,
  isFetchingThreeBox: state.uiState.isFetchingThreeBox,
  errorMessage: state.uiState.errorMessage,
  prevAddress: state.uiState.prevAddress,
  showErrorModal: state.uiState.showErrorModal,
  accessDeniedModal: state.uiState.accessDeniedModal,
  onOtherProfilePage: state.uiState.onOtherProfilePage,
  showFollowingPublicModal: state.uiState.showFollowingPublicModal,
  showContactsModal: state.uiState.showContactsModal,

  onSyncFinished: state.userState.onSyncFinished,
  isSyncing: state.userState.isSyncing,
  hasSignedOut: state.userState.hasSignedOut,
  prevNetwork: state.userState.prevNetwork,
  currentNetwork: state.userState.currentNetwork,
  isLoggedIn: state.userState.isLoggedIn,
  isSignedIntoWallet: state.userState.isSignedIntoWallet,
  currentAddress: state.userState.currentAddress,
  hasWeb3: state.userState.hasWeb3,

  otherAddressToFollow: state.otherProfile.otherAddressToFollow,

  otherFollowing: state.otherProfile.otherFollowing,
  otherName: state.otherProfile.otherName,
  following: state.myData.following,
  otherProfileAddress: state.otherProfile.otherProfileAddress
});

export default withRouter(
  connect(
    mapState,
    {
      openBox,
      requestAccess,
      checkWeb3,
      checkNetwork,
      getMyProfileValue,
      getMyDID,
      getCollectibles,
      getMySpacesData,
      convert3BoxToSpaces,
      getMyMemberSince,
      getVerifiedPublicGithub,
      getVerifiedPublicTwitter,
      getVerifiedPrivateEmail,
      getActivity,
      initialCheckWeb3,
      // getMyFollowing,
      requireMetaMaskModal,
      handleMobileWalletModal,
      handleSignInModal,
      handleRequireWalletLoginModal,
      handleSwitchedNetworkModal,
      handleAccessModal,
      handleConsentModal,
      handleDeniedAccessModal,
      handleLoggedOutModal,
      handleSignOut,
      handleSwitchedAddressModal,
      handleOnboardingModal,
      handleFollowingPublicModal,
      closeErrorModal,
      closeRequireMetaMaskModal,
      // getPublicFollowing,
      saveFollowing,
      handleContactsModal
    }
  )(App)
);