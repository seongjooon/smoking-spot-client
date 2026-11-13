import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Map as GoogleMap, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';

import './Map.scss';
import SearchIcon from './search-icon.png';
import PlusIcon from './plus-icon.png';
import PlaceSearch from './PlaceSearch';
import { fetchSpotList } from '../store';

const SEOUL = { lat: 37.5665, lng: 126.978 };
const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID || 'DEMO_MAP_ID';

const Map = () => {
  const dispatch = useDispatch();
  const { spotList, error } = useSelector(s => s);
  const [center, setCenter] = useState(SEOUL);
  const [searchBar, setSearchBar] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchSpotList());
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => setCenter({ lat: coords.latitude, lng: coords.longitude }),
      () => {} // 위치 거부 시 서울 기본값 유지
    );
  }, [dispatch]);

  const selected = spotList.find(s => s._id === selectedId);

  return (
    <>
      {searchBar ? (
        <div className='search-bar'>
          <img
            className='search-button-icon'
            alt='close search'
            src={SearchIcon}
            onClick={() => setSearchBar(false)}
          />
          <PlaceSearch onSelect={({ lat, lng }) => setCenter({ lat, lng })} />
        </div>
      ) : (
        <div className='header-box'>
          <Link to='/spots/new' className='new-page-button'>
            <img className='new-button-icon' alt='new-button' src={PlusIcon} />
          </Link>
          <Link to='/home' className='sub-logo'>
            <div className='sub-logo-smoking'>SMOKING</div>
            <div className='sub-logo-spot'>SPOT</div>
          </Link>
          <button className='search-button' onClick={() => setSearchBar(true)}>
            <img className='search-button-icon' alt='search box' src={SearchIcon} />
          </button>
        </div>
      )}
      {error && <div className='error-text'>{error}</div>}
      <div className='map-box'>
        <GoogleMap
          mapId={MAP_ID}
          center={center}
          onCenterChanged={ev => setCenter(ev.detail.center)}
          defaultZoom={17}
          gestureHandling='greedy'
          disableDefaultUI
        >
          {spotList.map(spot => (
            <AdvancedMarker
              key={spot._id}
              position={{
                lng: spot.location.coordinates[0],
                lat: spot.location.coordinates[1]
              }}
              onClick={() => setSelectedId(spot._id)}
            />
          ))}
          {selected && (
            <InfoWindow
              position={{
                lng: selected.location.coordinates[0],
                lat: selected.location.coordinates[1]
              }}
              pixelOffset={[0, -40]}
              onCloseClick={() => setSelectedId(null)}
            >
              <Link to={`/spots/${selected._id}`} className='spot-description-box'>
                <img className='spot-image' src={selected.photo_url} alt={selected.title} />
                <div className='spot-title'>{selected.title}</div>
                <div className='spot-address'>{selected.address}</div>
              </Link>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default Map;
