import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import App from '../components/App';
import Map from '../components/Map';

describe('<App />', () => {
  it('routes changing url', () => {
    const wrapper = shallow(
      <App initialEntries={['/spots/map']}>
        <Route exact path='/spots/map' render={() => <Map />} />
      </App>
    );

    // expect(wrapper.find(Map)).toHaveLength(1);
  });
});
