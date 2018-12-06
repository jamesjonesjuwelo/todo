import React from 'react';
import { shallow } from 'enzyme';
import ItemComponent from './NewItemComponent';
import 'jest-styled-components';

const props = {
  createItem: jest.fn()
};

describe('New Item Component', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow( <ItemComponent {...props} /> );
  });
  
  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('handling name change', () => {
    wrapper.instance().handleChange({ type: 'name', val: 'Test one' });
    expect(wrapper.state().name).toEqual('Test one');
  });
  
  test('handling description change', () => {
    wrapper.instance().handleChange({ type: 'description', val: 'Test two' });
    expect(wrapper.state().description).toEqual('Test two');
  });
  
  test('create new item with zero args', () => {
    wrapper.instance().createNewItem();
    expect(wrapper.state().error).toEqual(true);
  });
});