import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import makeBlockie from 'ethereum-blockies-base64';
import { withRouter } from 'react-router-dom';

import DefaultColorPic from '../assets/DefaultColorPic.svg';

class ChallengeList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="nav__userPicture" />
    );
  }
}

ProfilePicture.propTypes = {
  onClickFunction: PropTypes.func,
  currentAddress: PropTypes.string,
  pictureClass: PropTypes.string,
  otherProfileAddress: PropTypes.string,
  image: PropTypes.array,
  otherImage: PropTypes.array,
  imageToRender: PropTypes.array,
  isMyPicture: PropTypes.bool,
};

ProfilePicture.defaultProps = {
  onClickFunction: null,
  currentAddress: '',
  pictureClass: '',
  otherProfileAddress: '',
  image: [],
  otherImage: [],
  imageToRender: [],
  isMyPicture: true,
};

function mapState(state) {
  return {
    image: state.myData.image,

    currentAddress: state.userState.currentAddress,

    otherImage: state.otherProfile.otherImage,
    otherProfileAddress: state.otherProfile.otherProfileAddress,
  };
}

export default withRouter(connect(mapState)(ProfilePicture));
