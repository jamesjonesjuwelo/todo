import React from 'react';
import styled from 'styled-components';

const Input = ({ placeholder, handleChange, value, triggerMethod }) => {

  const updateVal = e => {
    const val = e.target.value;
    handleChange(val);
  };

  return <InputElem
    placeholder={placeholder}
    onChange={e => updateVal(e)}
    value={value}
    onKeyUp={(e) => {if (e.keyCode === 13) triggerMethod()}}
  />;
};

const faintOrange = 'rgba(231, 111, 81, 0.2)';

const transition = `
    -moz-transition: all 0.1s ease-in;
    -o-transition: all 0.1s ease-in;
    -webkit-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
`;

const InputElem = styled.input`
  margin-top: -10px;
  width: 100%;
  height: 26px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${faintOrange};
  background-color: inherit;
  
  ::placeholder {
    color: black;
  }
  
   :focus {
    outline: none;
  }
  ${transition}
`;

export default Input;