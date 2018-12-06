import React from 'react';
import { shallow } from 'enzyme';
import ItemComponent from './ItemComponent';
import 'jest-styled-components';

const props = {
  item: {
      id: 1,
      name: 'Test Name',
      description: 'Test Description',
      createdAt: 'Test Date',
      completed: false
  },
  updateItem: jest.fn(),
  deleteItem: jest.fn()
};

describe('Item Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow( <ItemComponent {...props} /> );
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('handling description change', () => {
    wrapper.instance().handleChange('Test one');
    expect(wrapper.state().description).toEqual('Test one');
  });
  
  test('toggle description input', () => {
    wrapper.instance().toggleDescriptionInput();
    expect(wrapper.state().descriptionInputVisible).toEqual(true);
  });
  
  test('toggle edit icon', () => {
    wrapper.instance().toggleDescriptionInput();
    expect(wrapper.state().editIconVisible).toEqual(false);
  });
});