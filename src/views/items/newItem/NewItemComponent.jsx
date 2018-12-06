import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { createNewItem } from '../../../store/action/notesAction';
import bindActionCreators from '../../../../util/bindActionCreators';
import Input from '../../../component/input/NewItemInputComponent';
import AddButton from '../../../component/button/AddButton';

export default class NewItemComponent extends Component {
  state = {
    name: '',
    description: '',
    error: false
  };

  createNewItem = () => {
    const { name, description } = this.state;
    if (!name || !description) {
      this.setState({
        error: true
      });
    } else {
      this.props.createNewItem(this.state);
      this.setState({
        name: '',
        description: '',
        error: false
      })
    }
  };

  handleChange = ({ type, val }) => {
    this.setState({ [type]: val });
  };


  render() {
    const { name, description, error } = this.state;
    
    const inputs = [
      {
        type: 'description',
        placeholder: 'What to do?',
        styling: descriptionInputStyles
      },
      {
        type: 'name',
        placeholder: 'Name',
        styling: nameInputStyles
      }
    ];

    return (
      <div>
        <Container>
          {inputs.map(info => {
            const { type, placeholder, styling } = info;
            return <Input
              key={`input_${type}`}
              placeholder={placeholder}
              handleChange={val => this.handleChange({type, val})}
              styling={styling}
              value={type === 'name' ? name : description}
              triggerMethod={() => this.createNewItem()}
            />;
          })}
          <AddButton createNewItem={this.createNewItem}/>
        </Container>
        {error
          ? <ErrorMessage>Looks like you're missing something! Please try again.</ErrorMessage>
          : <span />}
      </div>

    )
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  createNewItem
}, dispatch, props);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
);

const Container = styled.div`
  height: 80px;
  width: calc(100% - 70px);
  margin-left: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const descriptionInputStyles = {
  width: '60%',
  borderTopLeftRadius: '30px',
  borderBottomLeftRadius: '30px'
};

const nameInputStyles = {
  width: '20%',
  borderRight: '1px solid white'
};

const ErrorMessage = styled.p`
  position: absolute;
  right: 4%;
  margin-top: -9px;
  font-size: 12px;
  color: grey;
`;

export const NewItemComponentRoute = enhance(NewItemComponent);