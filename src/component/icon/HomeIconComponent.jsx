import React from 'react';
import styled from 'styled-components';
import Link from 'react-router-dom';

const HomeIconComponent = () =>
  <Link to="/">
    <Icon src="https://image.flaticon.com/icons/png/512/18/18625.png" />
  </Link>;

const Icon = styled.img`
  margin-top: 30px;
  cursor: pointer;
  width: 25px;
  height: 25px;
`;

export default HomeIconComponent;