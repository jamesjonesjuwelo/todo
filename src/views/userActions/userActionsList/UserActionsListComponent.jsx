import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { getUserActions } from '../../../store/action/userActionsAction';
import { toggleUserActionsOverlay } from '../../../store/action/commonAction';
import bindActionCreators from '../../../../util/bindActionCreators';
import UserActionComponent from '../userAction/UserActionComponent';
import IconComponent from '../../../component/icon/IconComponent';

export default class UserActionsListComponent extends Component {
  
  componentDidMount() {
    this.props.getUserActions();
  }
  
  closeUserActionsOverlay = () => {
    this.props.toggleUserActionsOverlay();
  };
  
  render() {
    const { userActions } = this.props;
    
    return (
      <Overlay>
        <Container>
          <IconComponent
            method={this.closeUserActionsOverlay}
            src="/icons/cross.png"
            styles={crossStyles}
          />
          <div className="user-actions-container">
            {userActions.length
              ? userActions.map(userAction =>
                <UserActionComponent key={`userAction-${userAction.id}`} userAction={userAction} />)
              : <NoItems>There are no recorded actions for this user.</NoItems>
            }
          </div>
        </Container>
      </Overlay>
    )
  }
}

const mapStateToProps = (state) => ({
  userActions: state.userActionsReducer.userActions
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  getUserActions,
  toggleUserActionsOverlay
}, dispatch, props);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
);

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex
  justify-content: center;
  align-items: center;
  background-color: rgba(16, 16, 16, 0.6);
`;

const Container = styled.div`
  width: 70%;
  height: 70%;
  padding: 20px;
  position: relative;
  background-color: white;
  overflow: scroll;
`;

const crossStyles = `
  position: absolute;
  right: 10px;
  top: 10px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  opacity: 0.5;
  
  :hover {
    opacity: 1;
  }
`;

const NoItems = styled.p`
  text-align: center;
`;


export const UserActionsComponentRoute = enhance(UserActionsListComponent);