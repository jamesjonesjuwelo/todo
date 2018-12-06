import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { updateItem, deleteItem } from '../../../store/action/notesAction';
import bindActionCreators from '../../../../util/bindActionCreators';
import IconComponent from '../../../component/icon/IconComponent';
import InputComponent from '../../../component/input/ItemInputComponent';

export default class ItemComponent extends Component {

  state = {
    descriptionInputVisible: false,
    editIconVisible: false,
    description: ''
  };

  componentDidMount() {
    const { item: { description } } = this.props;
    this.setState({ description });
  }

  toggleDescriptionInput = () => {
    this.setState({
      descriptionInputVisible: !this.state.descriptionInputVisible
    });

  };

  toggleEditIcon = boolean => {
    if (!this.state.descriptionInputVisible)
      this.setState({ editIconVisible: boolean})
  };

  handleChange = value =>
    this.setState({ description: value });


  updateItem = () => {
    const { item, updateItem } = this.props;
    const updateInfo = {
      item,
      description: this.state.description
    };
    updateItem(updateInfo);
    this.toggleDescriptionInput();
  };

  deleteItem = () => {
    const { item, deleteItem } = this.props;
    deleteItem(item);
  };
  
  completeItem = () => {
    const { item, updateItem } = this.props;
    const updateInfo = {
      item,
      completed: true
    };
    updateItem(updateInfo);
  };

  render() {
    const { item: { name, description, createdAt, completed } } = this.props,
      { descriptionInputVisible, editIconVisible } = this.state,
      opacity = completed ? 0.3 : 1,
      tick = 'tick',
      edit = 'edit',
      cross = 'cross';

    return (
      <Container
        onMouseEnter={() => this.toggleEditIcon(true)}
        onMouseLeave={() => this.toggleEditIcon(false)}
        style={{ opacity }}
      >
        {editIconVisible && !completed
        ? <IconComponent
          method={this.completeItem}
          src={`/icons/${tick}.png`}
          styles={completeTaskTickIconStyles}
        />
        : <span />}
        <TextContainer>
          <CreatedAt>{createdAt}</CreatedAt>
          <DescriptionContainer>
            {!descriptionInputVisible
              ? <Description>{description}</Description>
              : <InputComponent
                  placeholder={this.state.description}
                  value={this.state.description}
                  handleChange={val => this.handleChange(val)}
                  triggerMethod={() => this.updateItem()}
                />}
            {editIconVisible && !completed
             ? <IconComponent
                  method={this.toggleDescriptionInput}
                  src={`/icons/${edit}.png`}
                  styles={editIconStyles}
              />
             : <span />
            }
            {descriptionInputVisible
              ? (<IconComponent
                  method={this.updateItem}
                  src={`/icons/${tick}.png`}
                  styles={tickStyles}
              />)
              : <span />}
          </DescriptionContainer>
          <Name>{name}</Name>
          {editIconVisible
            ? <IconComponent
              method={() => this.deleteItem()}
              src={`/icons/${cross}.png`}
              styles={closeIconStyles}
            />
            : <span />}
        </TextContainer>
      </Container>

    )
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  updateItem,
  deleteItem
}, dispatch, props);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
);

const faintOrange = 'rgba(231, 111, 81, 0.3)';

const transition = `
    -moz-transition: all 0.1s ease-in;
    -o-transition: all 0.1s ease-in;
    -webkit-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
`;

const Container = styled.div`
  height: 100px;
  padding: 10px;
  position: relative;
  border-bottom: 1px solid ${faintOrange};
  
  :hover {
    background-color: ${faintOrange};
  }
  
  ${transition}
`;

const TextContainer = styled.div`
  width: 77.5%;
  padding-left: 2.5%;
`;

const zeroMargin = 'margin: 0';

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Description = styled.p`
  ${zeroMargin}
  font-weight: bold;
`;

const Name = styled.p`
font-size: 12px;
  
`;

const CreatedAt = styled.p`
  font-size: 10px;
  color: grey;
`;

const editIconStyles = `
  opacity: 0.5;
  margin-top: 3px;
  width: 10px;
  height: 10px;
  
  ${transition}
`;

const tickStyles = `
  opacity: 1;
  width: 15px;
  height: 15px;
`;

const completeTaskTickIconStyles = `
  ${tickStyles}
  position: absolute;
  top: 50px;
  left: 2px;
`;

const closeIconStyles = `
  opacity: 0.3;
  width: 15px;
  height: 15px;
  position: absolute;
  right: 10px;
  top: 10px;
  
  ${transition}
`;

export const ItemComponentRoute = enhance(ItemComponent);


