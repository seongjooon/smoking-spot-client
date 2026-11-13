import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './New.scss';

import PlaceSearch from './PlaceSearch';
import { uploadImage, createSpot } from '../lib/api';

const MAX_SIZE = 10 * 1024 * 1024;

const New = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handlePhoto = ev => {
    const picked = ev.target.files[0];
    if (!picked) return;
    if (!picked.type.startsWith('image/') || picked.size > MAX_SIZE) {
      setError('10MB 이하의 이미지 파일만 올릴 수 있습니다.');
      return;
    }
    setError('');
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    if (!file) return setError('사진을 추가해주세요.');
    if (!title.trim()) return setError('제목을 입력해주세요.');
    if (!location) return setError('주소를 검색해서 목록에서 선택해주세요.');

    setSubmitting(true);
    setError('');
    try {
      const photo_url = await uploadImage(file);
      await createSpot({
        title,
        photo_url,
        address: `${address} ${detailAddress}`.trim(),
        location: { type: 'Point', coordinates: [location.lng, location.lat] }
      });
      navigate('/spots');
    } catch (err) {
      console.error(err);
      setError('등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setSubmitting(false);
    }
  };

  return (
    <>
      <Link to='/home' className='sub-logo'>
        <div className='sub-logo-smoking'>SMOKING</div>
        <div className='sub-logo-spot'>SPOT</div>
      </Link>
      <form className='new-formbox' onSubmit={handleSubmit}>
        <div className='new-header-box'>
          <div className='new-text'>New</div>
          <div className='photo-plus-box'>
            <input
              id='form-file'
              className='photo-description'
              type='file'
              accept='image/*'
              name='file'
              onChange={handlePhoto}
            />
            <label htmlFor='form-file' className='photo-plus-button'>
              +photo
            </label>
          </div>
        </div>
        <div className='input-text-group'>
          <div className='previe-image'>
            {previewUrl ? (
              <img className='new-img' alt='img' src={previewUrl} />
            ) : (
              <div className='new-img-false'></div>
            )}
          </div>
          <input
            className='input-title group'
            type='text'
            name='title'
            maxLength={60}
            onChange={ev => setTitle(ev.target.value)}
            placeholder='title'
          />
          <PlaceSearch
            className='group'
            onSelect={place => {
              setLocation({ lat: place.lat, lng: place.lng });
              setAddress(place.text);
            }}
          />
          <input
            className='group'
            type='text'
            name='detail-address'
            maxLength={100}
            onChange={ev => setDetailAddress(ev.target.value)}
            placeholder='detail-address'
          />
          {error && <div className='error-text'>{error}</div>}
          <input
            className='submit-box group'
            name='submit'
            type='submit'
            value={submitting ? '등록 중...' : 'Submit'}
            disabled={submitting}
          />
        </div>
      </form>
    </>
  );
};

export default New;
