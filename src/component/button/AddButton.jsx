import React from 'react';
import styled from 'styled-components';

const AddButtonComponent = ({ createNewItem }) => {
  const addItem = () =>
    createNewItem();

  return (
    <AddButton onClick={addItem}>
      <Cross src="/icons/plus.png" />
    </AddButton>);
};

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const faintOrange = 'rgba(231, 111, 81, 0.9)';
const orange = '#E76F51';

const AddButton = styled.div`
  background-color: ${faintOrange};
  width: 10%;
  height: 60px;
  color: white;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  
  :hover {
    background-color: ${orange};
    color: ${orange};
  }
  
  ${transition}
`;

const Cross = styled.img`
  width: 80%;
`;

export default AddButtonComponent;