import React from 'react';
import { shallow } from 'enzyme';
import ItemListContainer from './ItemListContainer';
import 'jest-styled-components';

const props = {
  list: [
    {
      id: 1,
      name: 'Test Name',
      description: 'Test Description',
      createdAt: 'Test Date',
      completed: false
    },
    {
      id: 2,
      name: 'Test2 Name',
      description: 'Test2 Description',
      createdAt: 'Test2 Date',
      completed: false
    }
  ],
  getList: jest.fn()

};

describe('Item List Container', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow( <ItemListContainer {...props} /> );
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('container children length', () => {
    expect(wrapper.children().length).toBe(props.list.length);
  })
});