import React, { useState, useEffect } from 'react';
import './Map.scss';
import { Link } from 'react-router-dom';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

const Map = ({ getSpotList, spotList }) => {
  const [location, setLocation] = useState({});
  const [searchBar, setSearchBar] = useState(false);
  const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getGeolocation();
    getSpotList();
    return () => {
      console.log('clean up!');
    };
  }, []);

  const RenderMap = withGoogleMap(props => (
    <GoogleMap
      defaultCenter={{ lat: location.lat, lng: location.lng }}
      defaultZoom={17}
    >
      {spotList.length ? (
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
          {spotList.map((spot, index) => (
            <Marker
              key={index}
              position={{
                lng: spot.location.coordinates[0],
                lat: spot.location.coordinates[1]
              }}
              onClick={() => {
                setLocation({
                  lng: spot.location.coordinates[0],
                  lat: spot.location.coordinates[1]
                });
                setIsOpen(true);
              }}
            >
              {isOpen && (
                <InfoWindow
                  className='info-window'
                  onCloseClick={() => setIsOpen(false)}
                >
                  <Link
                    to={`/spots/${spot._id}`}
                    className='spot-description-box'
                  >
                    <img
                      className='spot-image'
                      src={spot.photo_url}
                      alt={spot.title}
                    />
                    <div className='spot-title'>{spot.title}</div>
                    <div className='spot-address'>{spot.address}</div>
                  </Link>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </MarkerClusterer>
      ) : null}
    </GoogleMap>
  ));

  const getGeolocation = () => {
    const geo = navigator.geolocation;
    geo.getCurrentPosition(({ coords }) => {
      setLocation({
        lat: coords.latitude,
        lng: coords.longitude
      });
    });
  };

  const _handleClick = boolean => {
    setSearchBar(boolean);
  };

  const _handleSelect = addressData => {
    geocodeByAddress(addressData)
      .then(result => getLatLng(result[0]))
      .then(latLng => setLocation(latLng))
      .catch(err => console.log('error', err));
  };

  return (
    <>
      {console.log('spotList', spotList)}
      {searchBar ? (
        <div className='search-bar'>
          <img
            className='search-button-icon'
            alt='search bar'
            src='https://www.iconsdb.com/icons/preview/white/search-12-xxl.png'
            onClick={() => _handleClick(false)}
          />
          <PlacesAutocomplete
            value={address}
            onChange={addressData => setAddress(addressData)}
            onSelect={_handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input'
                  })}
                />
                <div className='autocomplete-dropdown-container'>
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </PlacesAutocomplete>
        </div>
      ) : (
        <div className='header-box'>
          <Link to='/spots/new' className='new-page-button'>
            <img
              className='new-button-icon'
              alt='new-button'
              src='https://www.iconsdb.com/icons/preview/white/plus-5-xxl.png'
            />
          </Link>
          <Link to='/home' className='sub-logo'>
            <div className='sub-logo-smoking'>SMOKING</div>
            <div className='sub-logo-spot'>SPOT</div>
          </Link>
          <button className='search-button' onClick={() => _handleClick(true)}>
            <img
              className='search-button-icon'
              alt='search box'
              src='https://www.iconsdb.com/icons/preview/white/search-12-xxl.png'
            />
          </button>
        </div>
      )}
      <div className='map-box'>
        <RenderMap
          containerElement={<div style={{ height: `715px`, width: '375px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </>
  );
};

export default Map;
