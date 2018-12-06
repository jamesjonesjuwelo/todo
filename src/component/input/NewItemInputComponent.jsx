import React from 'react';
import styled from 'styled-components';

const Input = ({ placeholder, handleChange, styling, value, triggerMethod }) => {

  const updateVal = e => {
    const val = e.target.value;
    handleChange(val);
  };

  return <InputElem
    style={styling}
    placeholder={placeholder}
    onChange={e => updateVal(e)}
    value={value}
    onKeyUp={(e) => {if (e.keyCode === 13) triggerMethod()}}
  />;
};

const faintOrange = 'rgba(231, 111, 81, 0.9)';
const orange = '#E76F51';

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const InputElem = styled.input`
  margin: 0;
  height: 60px;
  padding: 0 15px;
  color: white;
  font-size: 16px;
  background-color: ${faintOrange};
  border: none;
  border-left: 1px solid white;
  
  ::placeholder {
    color: white;
  }
  
   :focus {
    outline: none;
    background-color: ${orange};

  }
  ${transition}
`;



export default Input;