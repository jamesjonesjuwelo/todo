import React from 'react';
import { shallow } from 'enzyme';
import UserActionsListComponent from './UserActionsListComponent';
import 'jest-styled-components';

const props = {
  userActions: [
    {
      id: 1,
      description: 'Test Description',
      type: 'Test type'
    },
    {
      id: 2,
      description: 'Test2 Description',
      type: 'Test2 type'
    }
  ],
  getUserActions: jest.fn(),
  toggleUserActionsOverlay: jest.fn()
  
};

describe('User Actions List Component', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow( <UserActionsListComponent {...props} /> );
  });
  
  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});