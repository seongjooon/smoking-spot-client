import React from 'react';
import { shallow } from 'enzyme';
import New from '../components/New';

describe('<New />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);

  beforeEach(() => {
    wrapper = shallow(<New />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const photoButton = wrapper.find('.photo-plus-button');

    expect(photoButton.contains('+photo')).toBe(true);
    expect(wrapper.contains(<div className='new-text'>New</div>)).toBe(true);
  });

  // it('renders changed states on input-text typing', () => {
  //   const titleInput = wrapper.find('.input-title');

  //   titleInput.simulate('change', { target: { value: 'Title-test' } });
  //   console.log(useStateSpy.mockImplementation(init => [init, setState]));
  //   expect(setState).toHaveBeenCalledWith('Title-test');
  // });
});
