import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from "react-redux";
import styled from 'styled-components';
import Toolbar from '../../component/toolbar/Toolbar';
import { ItemListContainerRoute } from '../items/itemsList/ItemListContainer';
import { NewItemComponentRoute } from '../items/newItem/NewItemComponent';
import { UserActionsComponentRoute } from '../userActions/userActionsList/UserActionsListComponent';
import bindActionCreators from "../../../util/bindActionCreators";


class Home extends Component {
  render() {
    const { userActionsOverlayVisible } = this.props;
    
    return (
      <Container>
        <Toolbar/>
        <NewItemComponentRoute />
        <ItemListContainerRoute />
        {userActionsOverlayVisible
          ? <UserActionsComponentRoute />
          : <span />}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  userActionsOverlayVisible: state.commonReducer.userActionsOverlayVisible
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({}, dispatch, props);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
);


const Container = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

export default enhance(Home);