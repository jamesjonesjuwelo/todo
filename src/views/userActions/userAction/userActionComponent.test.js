import React from 'react';
import { shallow } from 'enzyme';
import UserActionComponent from './UserActionComponent';
import 'jest-styled-components';

const props = {
  userAction: {
    description: 'Description',
    type: 'Type'
  }
};

describe('User Action Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow( <UserActionComponent {...props} /> );
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test(`contains props element`, () => {
    expect(wrapper.children().length).toBe(2);
  });
});