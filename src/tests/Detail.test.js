import React from 'react';
import { shallow } from 'enzyme';
import Detail from '../components/Detail';

describe('<Detail />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);
  let spotDetail;

  beforeEach(() => {
    wrapper = shallow(<Detail match={'88asdasd7666f771gvav75'} />);
    spotDetail = {
      title: 'Lizard',
      email: 'kamake@google.com',
      address: 'Poketmon world'
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const logoText = wrapper.find('.sub-logo-smoking');
    const logoSubText = wrapper.find('.sub-logo-spot');

    expect(logoText.contains('SMOKING')).toBe(true);
    expect(logoSubText.contains('SPOT')).toBe(true);
  });

  it('renders spotDetail what is one of props', () => {
    wrapper = shallow(
      <Detail
        spotDetail={spotDetail}
        comentList={[]}
        match={'88asdasd7666f771gvav75'}
      />
    );

    const creator = wrapper.find('.spot-detail-creator');
    const title = wrapper.find('.spot-detail-title');
    const address = wrapper.find('.spot-detail-address');

    expect(creator.contains('kamake@google.com')).toBe(true);
    expect(title.contains('Lizard')).toBe(true);
    expect(address.contains('Poketmon world')).toBe(true);
  });

  it('renders comentList what is one of props', () => {
    const comentList = [
      {
        created_by: 'Jiwoo',
        coment_text: 'U r mine from now!!',
        created_at: '2019-10-25-AM'
      }
    ];
    wrapper = shallow(
      <Detail
        spotDetail={spotDetail}
        comentList={comentList}
        match={'88asdasd7666f771gvav75'}
      />
    );

    expect(wrapper.contains(<div className='create-by'>Jiwoo</div>)).toBe(true);
    expect(
      wrapper.contains(<div className='coment-text'>U r mine from now!!</div>)
    ).toBe(true);
    expect(wrapper.contains(<div className='created-at'>2019-10-25</div>)).toBe(
      true
    );
  });
});
