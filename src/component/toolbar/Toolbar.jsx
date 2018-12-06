import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { toggleUserActionsOverlay } from '../../store/action/commonAction';
import {
  startRecording,
  stopRecording,
  clearRecording
} from '../../store/action/userActionsAction';
import bindActionCreators from '../../../util/bindActionCreators';
import IconComponent from '../icon/IconComponent';

class Toolbar extends Component {
  

  render() {
    const { startRecording, stopRecording, clearRecording, toggleUserActionsOverlay, recording } = this.props;
    const actionIcons = [
      {
        method: toggleUserActionsOverlay,
        src: 'replay'
      },
      {
        method: startRecording,
        src: 'start'
      },
      {
        method: stopRecording,
        src: 'stop'
      },
      {
        method: clearRecording,
        src: 'clear'
      },
    ];
    
    
    return (
      <Container>
        <Link to="/">
          <IconComponent
            src="/icons/home.png"
            styles={iconStyles}
          />
        </Link>
        
        {actionIcons.map((icon, idx) => {
          const { method, src } = icon;
          const iconSrc = src === 'start' && recording
            ? 'redStart'
            : src === 'start' && !recording
              ? 'blackStart'
              : src;
          
          return (
            <IconComponent
              key={`toolbar-icon-${idx}`}
              method={method}
              src={`/icons/${iconSrc}.png`}
              styles={iconStyles}
            />
            )
        })}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  recording: state.userActionsReducer.recording
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  toggleUserActionsOverlay,
  startRecording,
  stopRecording,
  clearRecording
}, dispatch, props);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
);

const Container = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  width: 70px;
  margin: 0;
  background-color: #E76F51;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const iconStyles = `
  margin-top: 30px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  padding-right: 10px;
`;


export default enhance(Toolbar);