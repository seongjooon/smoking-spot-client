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

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const photoButton = wrapper.find('.photo-plus-button');

    expect(photoButton.contains('+photo')).toBe(true);
    expect(wrapper.contains(<div className='new-text'>New</div>)).toBe(true);
    expect(
      wrapper.contains(<div className='sub-logo-smoking'>SMOKING</div>)
    ).toBe(true);
    expect(wrapper.contains(<div className='sub-logo-spot'>SPOT</div>)).toBe(
      true
    );
  });

  // it('renders changed states on input-text typing', () => {
  //   const onSubmit = jest.fn();
  //   wrapper = shallow(<New onSubmit={onSubmit} />);
  //   let titleInput = wrapper.find('input[name="title"]');
  //   const submitButton = wrapper.find('input[name="submit"]');

  //   titleInput.simulate('change', {
  //     target: {
  //       value: 'Title-test'
  //     }
  //   });

  //   submitButton.simulate('click');
  //   titleInput = {
  //     target: {
  //       value: 'Title-test'
  //     }
  //   };
  //   expect(onSubmit).toHaveBeenCalledWith(titleInput);
  // });
});
