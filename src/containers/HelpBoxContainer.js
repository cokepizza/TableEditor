import React from 'react';
import { connect } from 'react-redux';
import HelpBox from '../components/HelpBox/HelpBox';

const HelpBoxContainer = props => {
  return <HelpBox {...props} />;
};

export default connect(
  state => ({
    text: state.helpbox.text
  }),
  {}
)(HelpBoxContainer);
