import React from 'react';
import styled from 'styled-components';

const userActionComponent = ({ userAction }) => {
  const { description, type } = userAction;
  
  return (
    <Container>
      <Description>{description}</Description>
      <Type>{type}</Type>
    </Container>
  
  )
};

const faintOrange = 'rgba(231, 111, 81, 0.3)';

const Container = styled.div`
  padding: 10px;
  position: relative;
  border-bottom: 1px solid ${faintOrange};
`;

const Description = styled.p`
  font-weight: bold;
`;

const Type = styled.p`
  color: grey;
  font-size: 12px;
`;

export default userActionComponent;



