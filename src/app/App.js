import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from '../views/home/Home';
import styled from 'styled-components';

injectGlobal`
  body {
    font-family: 'Roboto Slab', sans-serif;
    margin: 0;
    line-height: 120%;
    font-size: 16px;
   
  }
`;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <OuterContainer>
            <Route key='1' exact path='/' component={Home} />
          </OuterContainer>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

const OuterContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
`;
