import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { createNewItem, getList } from '../../../store/action/notesAction';
import bindActionCreators from '../../../../util/bindActionCreators';
import { ItemComponentRoute } from '../item/ItemComponent';

export default class ItemListContainer extends Component {

  componentDidMount() {
    this.props.getList();
  }

  render() {
    const { list } = this.props;

    return (
      <Container>
        {list.length
          ? list.map(item => <ItemComponentRoute key={`item-${item.id}`} item={item} />)
          : <NoItems>There are no list items.</NoItems>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.notesReducer.list
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  createNewItem,
  getList
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

const Container = styled.div`
  height: 100%;
  width: calc(100% - 70px);
  margin-left: 70px;
  overflow: scroll;
`;

const NoItems = styled.p`
  text-align: center;
`;


export const ItemListContainerRoute = enhance(ItemListContainer);