import React from 'react';
import styled from 'styled-components';

const IconComponent = ({ method, src, styles }) => {
  const toggleInput = () => method();

  const Icon = styled.img`
  cursor: pointer;
  margin-left: 10px;
  ${styles}
  
  :hover {
    opacity: 1;
  }
`;

  return <Icon onClick={toggleInput} src={src} />;
};

export default IconComponent;