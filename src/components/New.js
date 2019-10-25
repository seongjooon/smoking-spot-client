import React, { useState } from 'react';
import './New.scss';
import { Link } from 'react-router-dom';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import jwt from 'jsonwebtoken';

let userToken = localStorage.getItem('jwtToken');
let decodedToken;
if (userToken) {
  decodedToken = jwt.verify(userToken, process.env.REACT_APP_SECRET_KEY);
}

const New = ({ onSubmit, failMessage }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [location, setLocation] = useState({});

  const _handleSelect = addressData => {
    geocodeByAddress(addressData)
      .then(result => getLatLng(result[0]))
      .then(latLng => setLocation(latLng))
      .catch(err => console.log('error', err));
  };

  const _handlePlusPhoto = ev => {
    ev.preventDefault();

    const reader = new FileReader();
    const file = ev.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const _handleSubmit = ev => {
    ev.preventDefault();

    const imageData = new FormData();
    imageData.append('file', file);

    const spotInfo = {
      email: decodedToken.email,
      title,
      address: `${address + detailAddress}`,
      location: { type: 'Point', coordinates: [location.lng, location.lat] }
    };

    onSubmit(imageData, spotInfo);
  };

  return (
    <>
      {failMessage && alert(failMessage)}
      <Link to='/home' className='sub-logo'>
        <div className='sub-logo-smoking'>SMOKING</div>
        <div className='sub-logo-spot'>SPOT</div>
      </Link>
      <form
        className='new-formbox'
        onSubmit={_handleSubmit}
        encType='multipart/form-data'
      >
        <div className='new-header-box'>
          <div className='new-text'>New</div>
          <div className='photo-plus-box'>
            <input
              id='form-file'
              className='photo-description'
              type='file'
              name='file'
              onChange={_handlePlusPhoto}
            />
            <label htmlFor='form-file' className='photo-plus-button'>
              +photo
            </label>
          </div>
        </div>
        <div className='input-text-group'>
          <div className='previe-image'>
            {imagePreviewUrl ? (
              <img className={`new-img`} alt='img' src={imagePreviewUrl} />
            ) : (
              <div className={`new-img-${!!imagePreviewUrl}`}></div>
            )}
          </div>
          <input
            className='input-title group'
            type='text'
            name='title'
            onChange={ev => setTitle(ev.target.value)}
            placeholder='title'
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
                    className: 'location-search-input group'
                  })}
                />
                <div className='autocomplete-dropdown-container'>
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className: suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item',
                          style: suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' }
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
          <input
            className='group'
            type='text'
            name='detail-address'
            onChange={ev => setDetailAddress(ev.target.value)}
            placeholder='detail-address'
          />
          <input className='submit-box group' name='submit' type='submit' value='Submit' />
        </div>
      </form>
    </>
  );
};

export default New;
